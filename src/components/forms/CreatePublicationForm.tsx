import { NewPublicationType } from "./formsTypes";
import * as Yup from "yup";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useFormik } from "formik";
import Button from "../button/Button";
import { ReactNode, useEffect, useRef, useState } from "react";
import GeoViewer from "../geolocator/GeoViewer";
import { CoordinatesType } from "../../pages/admin/AdminPublicationDetails";
import { getAddressCoordinates } from "../../interfaces/geolocation/getAddressCoordinates";
import PublicationPreview from "../producer/createPublication/PublicationPreview";

type CreatePublicationFormProps = {
	handleSubmit: (formValues: NewPublicationType) => void;
};

function CreatePublicationForm({ handleSubmit }: CreatePublicationFormProps) {
	const [previewVisibility, setPreviewVisibility] = useState(false); //Show / hide the PublicationPreview component
	const [numberOfMainImages, setNumberOfMainImages] = useState<number>(0); //Used to show the number of main pictures uploaded in the form
	const [numberOfSecondaryImages, setNumberOfSecondaryImages] = useState<number>(0); //Used to show the number of secondary pictures uploaded in the form
	const [mainImgDragActive, setMainImgDragActive] = useState(false); //Used to modify the styles of the input used to upload the main picture on dragover
	const [secondaryImgsDragActive, setSecondaryImgsDragActive] = useState(false); //Used to modify the styles of the input used to upload the secondary pictures on dragover
	const [addressCoordinates, setAddressCoordinates] = useState<CoordinatesType | undefined>({
		lat: -34.61315,
		lon: -58.37723
	});
	const isGeomapInfoLoaded = useRef<boolean>(false);
	const [textAreaCharacters, setTextAreaCharacters] = useState(0);
	const textAreaElement = useRef<HTMLTextAreaElement>(null);
	const textAreaCharactersLeft = 3000 - textAreaCharacters;
	const inputMainImgElement = useRef<HTMLInputElement>(null);
	const inputSecondaryImgsElement = useRef<HTMLInputElement>(null);

	const axiosController = useRef<AbortController>();

	const changeGeoMapTimeout = useRef<number>(0);

	const previewButtonFuncionality = {
		actionText: "Vista Previa",
		handleClick: showPreview
	};

	const submitButtonFuncionality = {
		submitText: "Guardar"
	};

	function showPreview() {
		setPreviewVisibility(true);
	}

	function hidePreview() {
		setPreviewVisibility(false);
	}

	function clickInputMainImg() {
		inputMainImgElement.current?.click();
	}

	function clickInputSecondaryImgs() {
		inputSecondaryImgsElement.current?.click();
	}

	const initialValues: NewPublicationType = {
		mainImg: [],
		images: [],
		title: "",
		details: "",
		area: "",
		harvestType: "",
		irrigationType: "",
		productionType: "",
		address: ""
	};

	//YUP VALIDATION START

	const noSpaceAtStartRegex = /^\S/g;
	const noSpaceEndingRegex = /\S$/g;
	const noSpecialCharacterRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ,.\s0-9]*$/g;

	const validationSchema = Yup.object({
		mainImg: Yup.array()
			.min(1, "Debes añadir una imagen principal")
			.test(
				"fileSize",
				"El archivo supera los 10 MB",
				(files) => files!.every((file) => file.size <= 1024 * 1024) // 1MB size limit
			)
			.test("fileType", "El formato del archivo no está soportado", (files) =>
				files!.every((file) => ["image/jpeg", "image/png", "application/pdf"].includes(file.type))
			),

		images: Yup.array()
			.min(1, "Debes añadir al menos una imagen")
			.max(9, "Máximo 9 imágenes secundarias")
			.test(
				"fileSize",
				"Alguno de los archivos supera los 10 MB",
				(files) => files!.every((file) => file.size <= 1024 * 1024) // 1MB size limit
			)
			.test("fileType", "El formato de alguno de los archivos no está soportado", (files) =>
				files!.every((file) => ["image/jpeg", "image/png", "application/pdf"].includes(file.type))
			),

		title: Yup.string()
			.required("Debes completar este campo")
			.max(50, "Máximo 50 caracteres")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.min(6, "Al menos 6 caracteres"),

		details: Yup.string()
			.required("Debes completar este campo")
			.max(3000, "Máximo 3000 caracteres")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.min(15, "Al menos 15 caracteres"),

		area: Yup.string()
			.required("Debes completar este campo")
			.max(15, "Máximo 15 caracteres")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.min(2, "Al menos 2 caracteres"),

		harvestType: Yup.string()
			.required("Debes completar este campo")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.max(25, "Máximo 25 caracteres"),

		irrigationType: Yup.string()
			.required("Debes completar este campo")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.max(20, "Máximo 20 caracteres"),

		productionType: Yup.string()
			.required("Debes completar este campo")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.max(15, "Máximo 15 caracteres"),

		address: Yup.string()
			.required("Debes completar este campo")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.max(50, "Máximo 50 caracteres")
	});

	//YUP VALIDATION END

	const handleMainImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.files) {
			const newFile = Array.from(event.currentTarget.files);
			formik.setFieldValue("mainImg", newFile);
		}
	};

	const handleSecondaryImgsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.files) {
			const newFiles = Array.from(event.currentTarget.files);
			const updatedFiles = [...formik.values.images, ...newFiles];
			formik.setFieldValue("images", updatedFiles);
		}
	};

	const handleMainImgDragOver = (event: React.DragEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setMainImgDragActive(true);
	};

	const handleSecondaryImgsDragOver = (event: React.DragEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setSecondaryImgsDragActive(true);
	};

	const handleMainImgDragLeave = (event: React.DragEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setMainImgDragActive(false);
	};

	const handleSecondaryImgsDragLeave = (event: React.DragEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setSecondaryImgsDragActive(false);
	};

	const handleMainImgDrop = (event: React.DragEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setMainImgDragActive(false);
		const newFile = Array.from(event.dataTransfer.files);
		formik.setFieldValue("mainImg", newFile);
	};

	const handleSecondaryImgsDrop = (event: React.DragEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setSecondaryImgsDragActive(false);
		const newFiles = Array.from(event.dataTransfer.files);
		const updatedFiles = [...formik.values.images, ...newFiles];
		formik.setFieldValue("images", updatedFiles);
	};

	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: handleSubmit,
		validationSchema,
		enableReinitialize: true
	});

	useEffect(() => {
		setNumberOfMainImages(formik.values.mainImg.length);
		setNumberOfSecondaryImages(formik.values.images.length);
		if (textAreaElement.current?.value.length) {
			setTextAreaCharacters(textAreaElement.current.value.length);
		}
	}, [formik.values.images, formik.values.mainImg, textAreaElement.current?.value.length]);

	useEffect(() => {
		axiosController.current = new AbortController();

		if (formik.values.address.length > 6) {
			clearTimeout(changeGeoMapTimeout.current);

			changeGeoMapTimeout.current = window.setTimeout(() => {
				getAddressCoordinates(axiosController.current!, formik.values.address)
					.then((coordinates) => {
						isGeomapInfoLoaded.current = true;
						setAddressCoordinates(coordinates);
					})
					.catch(() => {
						isGeomapInfoLoaded.current = true;
						setAddressCoordinates(undefined);
					});
			}, 2000);
		}

		return () => {
			clearTimeout(changeGeoMapTimeout.current);
		};
	}, [formik.values.address]);

	useEffect(() => {
		return () => {
			axiosController.current?.abort();
		};
	}, []);

	return (
		<div className="flex flex-col w-full">
			<form name="createPublicationForm" onSubmit={formik.handleSubmit} noValidate className="">
				{/* FIRST SECTION */}
				<div
					className="w-full py-[0.8rem] pl-[1.87rem] pr-[1.4rem] border-grey300 border-[1px] border-solid rounded-lg shadow-below-light
					custom-500:py-[1.2rem] custom-900:py-[1.5rem] custom-1400:py-[2rem] custom-1900:py-[3rem] custom-2500:py-[4rem]
					custom-600:pl-[2.5rem] custom-900:pl-[3.5rem] custom-1200:pl-[4.2rem] custom-1400:pl-[5rem] custom-1900:pl-[7rem] custom-2500:pl-[9rem]
					custom-600:pr-[2rem] custom-900:pr-[2.5rem] custom-1200:pr-[3rem] custom-1400:pr-[3.8rem] custom-1900:pr-[6rem]"
				>
					<h2
						className="text-[1.85rem] font-semibold drop-shadow-bigText
						custom-500:text-[2.5rem] custom-900:text-[3.5rem] custom-1200:text-[4rem] custom-1400:text-[4.9rem] custom-1900:text-[6rem] custom-2500:text-[7rem]"
					>
						Agregar imágenes
					</h2>
					<p
						className="mt-[0.6rem] text-[0.9rem] font-normal drop-shadow-smallText
						custom-500:text-[1.4rem] custom-900:text-[2rem] custom-1200:text-[2.2rem] custom-1400:text-[2.4rem] custom-1900:text-[3rem] custom-2500:text-[4rem]
						custom-900:mt-[1rem] custom-1400:mt-[1.6rem]"
					>
						Imágenes
					</p>
					<p
						className="text-[0.6rem] mt-[0.6rem] drop-shadow-smallText
						custom-500:text-[1.1rem] custom-900:text-[1.4rem] custom-1400:text-[1.6rem] custom-1900:text-[2rem] custom-2500:text-[2.4rem]
						custom-900:mt-[1rem] custom-1400:mt-[1.6rem] custom-1900:mt-[1rem]"
					>
						Incorpora algunas fotos para dar a conocer tu huerta
					</p>

					<div
						className="flex flex-col items-center mt-[1.2rem] px-[2rem] py-[1.6rem] bg-brown150 rounded-lg
						custom-600:mt-[2rem] custom-900:mt-[2.5rem] custom-1400:mt-[3.2rem]
						custom-420:px-[3rem] custom-700:px-[3.5rem] custom-900:px-[4rem] custom-1400:px-[4.6rem]
						custom-600:py-[2rem] custom-900:py-[2.5rem] custom-1400:py-[3.2rem] custom-1900:py-[4rem]
						custom-900:shadow-below-dark"
					>
						<div
							className="mt-[-1rem] text-grey500 text-[3.2rem]
							custom-500:mt-[-1.6rem] custom-900:mt-[-2rem] custom-1400:mt-[-2.5rem] custom-1900:mt-[-3.5rem]
							custom-500:text-[4.5rem] custom-700:text-[6rem] custom-900:text-[7rem] custom-1400:text-[8.7rem] custom-1900:text-[10rem] custom-2500:text-[12rem]"
						>
							<ImageOutlinedIcon color="inherit" fontSize="inherit" />
						</div>
						<p
							className="mt-[1.2rem] text-[0.9rem] font-semibold
							custom-900:mt-[1.8rem] custom-1400:mt-[2.2rem] custom-1900:mt-[1.5rem]
							custom-500:text-[1.5rem] custom-900:text-[2rem] custom-1400:text-[2.4rem] custom-1900:text-[3rem] custom-2500:text-[4rem]"
						>
							arrastra y coloca una imagen o
						</p>

						<div
							className="flex justify-between items-center w-full text-brandingDarkGreen text-[0.8rem] font-semibold
							custom-500:text-[1.2rem] custom-700:text-[1.4rem]  custom-900:text-[1.6rem]  custom-1200:text-[1.8rem] custom-1400:text-[2rem] custom-1900:text-[2.5rem] custom-2500:text-[3rem]"
						>
							{/* UPLOAD MAIN PICTURE BUTTON */}

							<div className="relative flex items-center justify-between">
								<button
									type="button"
									className={`relative flex flex-col items-center justify-center w-[9.5rem] h-[5.5rem] py-[0.5rem] px-[0.5rem] mt-[1.5rem] ${mainImgDragActive ? "cursor-help opacity-60 scale-110" : "cursor-pointer"} border-[2px] border-brandingDarkGreen border-solid rounded-lg bg-transparent duration-300
										custom-390:w-[13rem] custom-400:w-[14rem] custom-500:w-[20rem] custom-700:w-[25rem] custom-900:w-[29rem] custom-1200:w-[32rem] custom-1400:w-[34.2rem] custom-1900:w-[43rem] custom-2500:w-[52rem]
										custom-700:h-[7rem] custom-900:h-[8rem] custom-1200:h-[9rem] custom-1400:h-[10rem] custom-1900:h-[12rem]
										custom-1400:py-[0.95rem]
										custom-700:mt-[2rem] custom-900:mt-[2.5rem] custom-1400:mt-[3.2rem]`}
									onClick={clickInputMainImg}
									onDragOver={handleMainImgDragOver}
									onDragLeave={handleMainImgDragLeave}
									onDrop={handleMainImgDrop}
								>
									<p className="p-0">Cargar imagen principal</p>
									<p
										className="mt-[0rem]
										custom-390:mt-[2px] custom-600:mt-[0px] custom-900:mt-[-2px] custom-1400:mt-[-5px] custom-1900:mt-[-2px]"
									>
										{`(${numberOfMainImages})`}
									</p>

									<input
										ref={inputMainImgElement}
										className={`absolute top-[0px] left-[0px] w-[1px] h-[1px] text-[1px] opacity-0  ${mainImgDragActive ? "cursor-move" : "cursor-pointer"}`}
										id="mainImg"
										name="mainImg"
										type="file"
										multiple
										onChange={handleMainImgChange}
									></input>
								</button>

								{formik.touched.mainImg && formik.errors.mainImg ? (
									<p
										className="absolute bottom-[-0.8rem] right-[0px] w-full text-center text-[0.5rem] text-red-600
										custom-390:bottom-[-1.2rem] custom-500:bottom-[-1.6rem] custom-700:bottom-[-2rem] custom-1400:bottom-[-2.3rem] custom-1900:bottom-[-3rem] custom-2500:bottom-[-4rem]
										custom-390:text-[0.7rem] custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1900:text-[1.7rem] custom-2500:text-[2.3rem]"
									>
										{formik.errors.mainImg as ReactNode}
									</p>
								) : null}
							</div>

							{/* UPLOAD SECONDARY PICTURES BUTTON */}

							<div className="relative flex items-center">
								<button
									type="button"
									className={`relative flex flex-col items-center justify-center w-[9.5rem] h-[5.5rem] py-[0.5rem] px-[0.5rem] mt-[1.5rem] ${secondaryImgsDragActive ? "cursor-help opacity-60 scale-110" : "cursor-pointer"} border-[2px] border-brandingDarkGreen border-solid rounded-lg bg-transparent duration-300
										custom-390:w-[13rem] custom-400:w-[14rem] custom-500:w-[20rem] custom-700:w-[25rem] custom-900:w-[29rem] custom-1200:w-[32rem] custom-1400:w-[34.2rem] custom-1900:w-[43rem] custom-2500:w-[52rem]
										custom-700:h-[7rem] custom-900:h-[8rem] custom-1200:h-[9rem] custom-1400:h-[10rem] custom-1900:h-[12rem]
										custom-1400:py-[0.95rem]
										custom-700:mt-[2rem] custom-900:mt-[2.5rem] custom-1400:mt-[3.2rem] custom-1900:mt-[4rem]`}
									onClick={clickInputSecondaryImgs}
									onDragOver={handleSecondaryImgsDragOver}
									onDragLeave={handleSecondaryImgsDragLeave}
									onDrop={handleSecondaryImgsDrop}
								>
									<p className="p-0">Cargar imágenes secundarias</p>
									<p
										className="mt-[0rem]
										custom-390:mt-[2px] custom-600:mt-[0px] custom-900:mt-[-2px] custom-1400:mt-[-5px] custom-1900:mt-[-2px]"
									>
										{`(${numberOfSecondaryImages})`}
									</p>

									<input
										ref={inputSecondaryImgsElement}
										className={`absolute top-[0px] left-[0px] w-[1px] h-[1px] text-[1px] opacity-0  ${secondaryImgsDragActive ? "cursor-move" : "cursor-pointer"}`}
										id="images"
										name="images"
										type="file"
										multiple
										onChange={handleSecondaryImgsChange}
									></input>
								</button>

								{formik.touched.images && formik.errors.images ? (
									<p
										className="absolute bottom-[-0.8rem] right-[0px] w-full text-center text-[0.5rem] text-red-600
										custom-390:bottom-[-1.2rem] custom-500:bottom-[-1.6rem] custom-700:bottom-[-2rem] custom-1400:bottom-[-2.3rem] custom-1900:bottom-[-3rem] custom-2500:bottom-[-4rem]
										custom-390:text-[0.7rem] custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1900:text-[1.7rem] custom-2500:text-[2.3rem]"
									>
										{formik.errors.images as ReactNode}
									</p>
								) : null}
							</div>
						</div>

						<div
							className="flex w-full mt-[1.4rem] text-[0.524rem] font-light
							custom-1900:justify-center
							custom-500:text-center
							custom-600:mt-[2rem] custom-900:mt-[2.5rem] custom-1200:mt-[3rem] custom-1400:mt-[3.2rem] custom-1900:mt-[4rem]
							custom-500:text-[0.9rem] custom-700:text-[1.1rem] custom-1000:text-[1.4rem] custom-1900:text-[2rem] custom-2500:text-[2.6rem]"
						>
							<p>
								. Puedes ingresar hasta 10 imágenes.&nbsp;&nbsp; Tamaño máximo de archivo: 10 MB.&nbsp;&nbsp; Archivos
								de imagen compatibles: JPEG o PNG
							</p>
						</div>
					</div>
				</div>

				{/* SECOND SECTION */}

				<div
					className="w-full mt-[1.6rem] pt-[0.9rem] pb-[0.5rem] px-[1.9rem] border-grey300 border-[1px] border-solid rounded-lg shadow-below-light
					custom-500:mt-[2.5rem] custom-900:mt-[3.5rem] custom-1400:mt-[4rem] custom-1900:mt-[6rem] custom-2500:mt-[8rem]
					custom-500:pt-[1.5rem] custom-1400:pt-[2.4rem] custom-1900:pt-[3rem] custom-2500:pt-[4rem]
					custom-500:pb-[1rem] custom-1400:pb-[1.2rem] custom-1900:pb-[2rem]
					custom-600:px-[3rem] custom-900:px-[4rem] custom-1400:px-[5rem] custom-1900:px-[7rem] custom-2500:px-[9rem]"
				>
					<h2
						className="text-[1.835rem] font-semibold drop-shadow-bigText
						custom-500:text-[2.2rem] custom-900:text-[3rem] custom-1200:text-[4rem] custom-1400:text-[4.9rem] custom-1900:text-[6rem]"
					>
						Descripción general de la publicación
					</h2>
					<p
						className="mt-[0.6rem] text-[0.9rem] font-normal drop-shadow-smallText
						custom-900:mt-[1rem] custom-1400:mt-[1.6rem]
						custom-500:text-[1.3rem] custom-900:text-[1.7rem] custom-1200:text-[2rem] custom-1400:text-[2.4rem] custom-1900:text-[3rem] custom-2500:text-[4rem]"
					>
						Nombre de la publicación
					</p>
					<p
						className="text-[0.6rem] drop-shadow-smallText
						custom-1900:mt-[1rem]
						custom-500:text-[1rem] custom-900:text-[1.2rem] custom-1200:text-[1.4rem] custom-1400:text-[1.6rem] custom-1900:text-[2rem] custom-2500:text-[2.4rem]"
					>
						Escribí un título claro y descriptivo para indicar de qué se trata la publicación.
					</p>

					{/* TITLE INPUT */}

					<div
						className="relative w-[46%] mt-[2rem] border border-black border-solid rounded-md shadow-below-light
						custom-900:mt-[3rem] custom-1400:mt-[4.5rem] custom-2500:mt-[5.5rem]"
					>
						<label
							htmlFor="title"
							className="absolute top-[-0.5rem] left-[1.5rem] px-[0.3rem] text-[0.6rem] bg-white
							custom-900:px-[0.6rem]
							custom-500:top-[-0.8rem] custom-700:top-[-1rem] custom-1200:top-[-1.1rem] custom-1400:top-[-1.2rem] custom-1900:top-[-1.5rem] custom-2500:top-[-2rem]
							custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1400:text-[1.6rem] custom-1900:text-[1.9rem] custom-2500:text-[2.4rem]"
						>
							Título
						</label>

						<input
							type="text"
							id="title"
							placeholder="Nombre de la publicación"
							{...formik.getFieldProps("title")}
							className="outline-none px-[0.4rem] pt-[0rem] w-full text-[0.8rem] placeholder-grey500 placeholder:text-[0.7rem] rounded-md
								custom-500:p-[0.9rem_1rem_0.6rem] custom-700:p-[1.1rem_1.1rem_0.6rem] custom-1000:p-[1.4rem_1.4rem_0.6rem] custom-1400:p-[1.6rem_1.6rem_0.4rem] custom-1900:p-[1.8rem_1.8rem_1rem] custom-2500:p-[2rem_2rem_1.3rem]
								custom-500:text-[1.2rem] custom-700:text-[1.4rem] custom-900:text-[1.6rem] custom-1400:text-[1.7rem] custom-1900:text-[2.2rem] custom-2500:text-[2.6rem]
								custom-500:placeholder:text-[1.1rem] custom-700:placeholder:text-[1.2rem] custom-900:placeholder:text-[1.4rem] custom-1400:placeholder:text-[1.6rem] custom-1900:placeholder:text-[1.9rem] custom-2500:placeholder:text-[2.5rem]"
						/>

						{formik.touched.title && formik.errors.title ? (
							<p
								className="absolute bottom-[0.6rem] right-[-80%] ml-4 text-[0.5rem] text-red-600
								custom-1400:bottom-[1.3rem] custom-2500:bottom-[2rem]
								custom-390:right-[-80%] custom-1000:right-[-60%] custom-1900:right-[-50%]
								custom-390:text-[0.7rem] custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1900:text-[1.7rem] custom-2500:text-[2.3rem]"
							>
								{formik.errors.title}
							</p>
						) : null}
					</div>

					{/* DETAILS TEXTAREA */}

					<div
						className="relative w-[90%] mt-[1rem] border border-black border-solid rounded-md shadow-below-light
						custom-500:mt-[1.6rem] custom-900:mt-[2rem] custom-1400:mt-[2.4rem] custom-2500:mt-[4rem]"
					>
						<label
							htmlFor="details"
							className="absolute top-[-0.5rem] left-[1.5rem] px-[0.3rem] text-[0.6rem] bg-white
							custom-900:px-[0.6rem]
							custom-500:top-[-0.8rem] custom-700:top-[-1rem] custom-1200:top-[-1.1rem] custom-1400:top-[-1.2rem] custom-1900:top-[-1.5rem] custom-2500:top-[-2rem]
							custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1400:text-[1.6rem] custom-1900:text-[1.9rem] custom-2500:text-[2.4rem]"
						>
							Descripción
						</label>

						<textarea
							ref={textAreaElement}
							id="details"
							placeholder="Texto de la publicación"
							maxLength={3000}
							rows={window.innerWidth > 700 ? 7 : 4}
							{...formik.getFieldProps("details")}
							className="outline-none px-[0.4rem] pt-[0rem] w-full text-[0.8rem] placeholder-grey500 placeholder:text-[0.7rem] rounded-md
								custom-500:p-[0.9rem_1rem_0.6rem] custom-700:p-[1.1rem_1.1rem_0.6rem] custom-1000:p-[1.4rem_1.4rem_0.6rem] custom-1400:p-[1.6rem_1.6rem_0.4rem] custom-1900:p-[1.8rem_1.8rem_1rem] custom-2500:p-[2rem_2rem_1.3rem]
								custom-500:text-[1.2rem] custom-700:text-[1.4rem] custom-900:text-[1.6rem] custom-1400:text-[1.7rem] custom-1900:text-[2.2rem] custom-2500:text-[2.6rem]
								custom-500:placeholder:text-[1.1rem] custom-700:placeholder:text-[1.2rem] custom-900:placeholder:text-[1.4rem] custom-1400:placeholder:text-[1.6rem] custom-1900:placeholder:text-[1.9rem] custom-2500:placeholder:text-[2.5rem]"
						/>

						{formik.touched.details && formik.errors.details ? (
							<p
								className="absolute bottom-[-1.5rem] left-[35%] ml-4 text-[0.5rem] text-red-600
								custom-400:bottom-[-1.6rem] custom-500:bottom-[-1.8rem] custom-700:bottom-[-2.2rem] custom-1400:bottom-[-2.8rem] custom-2500:bottom-[-4rem]
								custom-1400:left-[40%]
								custom-390:text-[0.7rem] custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1900:text-[1.7rem] custom-2500:text-[2.3rem]"
							>
								{formik.errors.details}
							</p>
						) : null}
					</div>
					<p
						className="mt-[0.4rem] text-darkGrayText text-[0.7rem]
						custom-1400:mt-[1rem]
						custom-500:text-[1rem] custom-700:text-[1.3rem] custom-1000:text-[1.5rem] custom-1400:text-[1.8rem] custom-1900:text-[2rem] custom-2500:text-[2.5rem]
						custom-900:drop-shadow-smallText"
					>
						{`${textAreaCharacters} / ${textAreaCharactersLeft}`}
					</p>
				</div>

				{/* THIRD SECTION */}

				<div
					className="w-full mt-[1.6rem] pt-[0.9rem] pb-[2.5rem] px-[1.9rem] border-grey300 border-[1px] border-solid rounded-lg shadow-below-light
					custom-500:mt-[2.5rem] custom-900:mt-[3.5rem] custom-1400:mt-[4rem] custom-1900:mt-[6rem] custom-2500:mt-[8rem]
					custom-500:pt-[1.2rem] custom-900:pt-[2rem] custom-1400:pt-[2.4rem] custom-1900:pt-[3rem] custom-2500:pt-[4rem]
					custom-600:px-[2.5rem] custom-900:px-[4rem] custom-1400:px-[5rem] custom-1900:px-[7rem] custom-2500:px-[9rem]
					custom-6:pb-[3rem] custom-900:pb-[4rem] custom-1400:pb-[5rem]"
				>
					<h2
						className="text-[1.31rem] font-semibold drop-shadow-bigText
						custom-500:text-[2.2rem] custom-900:text-[2.6rem] custom-1200:text-[3rem] custom-1400:text-[3.5rem] custom-1900:text-[4rem] custom-2500:text-[5rem]"
					>
						Detalles de la publicación
					</h2>
					<p
						className="mt-[0.5rem] text-[0.6rem] drop-shadow-smallText
						custom-900:mt-[0.9rem] custom-1400:mt-[1.2rem]
						custom-500:text-[1rem] custom-900:text-[1.2rem] custom-1200:text-[1.4rem] custom-1400:text-[1.6rem] custom-1900:text-[2rem] custom-2500:text-[2.4rem]"
					>
						Información adicional sobre la huerta, es opcional si quiere sumar mas información sobre tu publicación
					</p>

					{/* AREA INPUT */}

					<div
						className="relative w-[58%] mt-[1.4rem] border border-black border-solid rounded-md shadow-below-light
						custom-1400:w-[46%]
						custom-500:mt-[2rem] custom-700:mt-[2.5rem] custom-1000:mt-[3rem] custom-1400:mt-[3.5rem] custom-2500:mt-[4rem]"
					>
						<label
							htmlFor="area"
							className="absolute top-[-0.5rem] left-[1.5rem] px-[0.3rem] text-[0.6rem] bg-white
							custom-900:px-[0.6rem]
							custom-500:top-[-0.8rem] custom-700:top-[-1rem] custom-1200:top-[-1.1rem] custom-1400:top-[-1.2rem] custom-1900:top-[-1.5rem] custom-2500:top-[-2rem]
							custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1400:text-[1.6rem] custom-1900:text-[1.9rem] custom-2500:text-[2.4rem]"
						>
							Superficie
						</label>

						<input
							type="text"
							id="area"
							placeholder="Tamaño de huerta"
							{...formik.getFieldProps("area")}
							className="outline-none px-[0.4rem] pt-[0rem] w-full text-[0.8rem] placeholder-grey500 placeholder:text-[0.7rem] rounded-md
								custom-500:p-[0.9rem_1rem_0.6rem] custom-700:p-[1.1rem_1.1rem_0.6rem] custom-1000:p-[1.4rem_1.4rem_0.6rem] custom-1400:p-[1.6rem_1.6rem_0.4rem] custom-1900:p-[1.8rem_1.8rem_1rem] custom-2500:p-[2rem_2rem_1.3rem]
								custom-500:text-[1.2rem] custom-700:text-[1.4rem] custom-900:text-[1.6rem] custom-1400:text-[1.7rem] custom-1900:text-[2.2rem] custom-2500:text-[2.6rem]
								custom-500:placeholder:text-[1.1rem] custom-700:placeholder:text-[1.2rem] custom-900:placeholder:text-[1.4rem] custom-1400:placeholder:text-[1.6rem] custom-1900:placeholder:text-[1.9rem] custom-2500:placeholder:text-[2.5rem]"
						/>

						{formik.touched.area && formik.errors.area ? (
							<p
								className="absolute bottom-[0.6rem] right-[-60%] ml-4 text-[0.5rem] text-red-600
								custom-1400:bottom-[1.3rem] custom-2500:bottom-[2rem]
								custom-390:right-[-60%] custom-1900:right-[-50%]
								custom-390:text-[0.7rem] custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1900:text-[1.7rem] custom-2500:text-[2.3rem]"
							>
								{formik.errors.area}
							</p>
						) : null}
					</div>

					{/* HARVEST TYPE INPUT */}

					<div
						className="relative w-[58%] mt-[1.2rem] border border-black border-solid rounded-md shadow-below-light
						custom-1400:w-[46%]
						custom-500:mt-[2rem] custom-700:mt-[2.5rem] custom-1000:mt-[3rem] custom-1400:mt-[3.2rem] custom-2500:mt-[4rem]"
					>
						<label
							htmlFor="harvestType"
							className="absolute top-[-0.5rem] left-[1.5rem] px-[0.3rem] text-[0.6rem] bg-white
							custom-900:px-[0.6rem]
							custom-500:top-[-0.8rem] custom-700:top-[-1rem] custom-1200:top-[-1.1rem] custom-1400:top-[-1.2rem] custom-1900:top-[-1.5rem] custom-2500:top-[-2rem]
							custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1400:text-[1.6rem] custom-1900:text-[1.9rem] custom-2500:text-[2.4rem]"
						>
							Tipo de cosecha
						</label>

						<input
							type="text"
							id="harvestType"
							placeholder="Por ejemplo: Verduras de estación"
							{...formik.getFieldProps("harvestType")}
							className="outline-none px-[0.4rem] pt-[0rem] w-full text-[0.8rem] placeholder-grey500 placeholder:text-[0.7rem] rounded-md
								custom-500:p-[0.9rem_1rem_0.6rem] custom-700:p-[1.1rem_1.1rem_0.6rem] custom-1000:p-[1.4rem_1.4rem_0.6rem] custom-1400:p-[1.6rem_1.6rem_0.4rem] custom-1900:p-[1.8rem_1.8rem_1rem] custom-2500:p-[2rem_2rem_1.3rem]
								custom-500:text-[1.2rem] custom-700:text-[1.4rem] custom-900:text-[1.6rem] custom-1400:text-[1.7rem] custom-1900:text-[2.2rem] custom-2500:text-[2.6rem]
								custom-500:placeholder:text-[1.1rem] custom-700:placeholder:text-[1.2rem] custom-900:placeholder:text-[1.4rem] custom-1400:placeholder:text-[1.6rem] custom-1900:placeholder:text-[1.9rem] custom-2500:placeholder:text-[2.5rem]"
						/>

						{formik.touched.harvestType && formik.errors.harvestType ? (
							<p
								className="absolute bottom-[0.6rem] right-[-60%] ml-4 text-[0.5rem] text-red-600
								custom-2500:bottom-[2rem]
								custom-390:right-[-60%] custom-1900:right-[-50%]
								custom-390:text-[0.7rem] custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1900:text-[1.7rem] custom-2500:text-[2.3rem]"
							>
								{formik.errors.harvestType}
							</p>
						) : null}
					</div>

					{/* IRRIGATION INPUT */}

					<div
						className="relative w-[58%] mt-[1.2rem] border border-black border-solid rounded-md shadow-below-light
						custom-1400:w-[46%]
						custom-500:mt-[2rem] custom-700:mt-[2.5rem] custom-1000:mt-[3rem] custom-1400:mt-[3.2rem] custom-2500:mt-[4rem]"
					>
						<label
							htmlFor="irrigationType"
							className="absolute top-[-0.5rem] left-[1.5rem] px-[0.3rem] text-[0.6rem] bg-white
							custom-900:px-[0.6rem]
							custom-500:top-[-0.8rem] custom-700:top-[-1rem] custom-1200:top-[-1.1rem] custom-1400:top-[-1.2rem] custom-1900:top-[-1.5rem] custom-2500:top-[-2rem]
							custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1400:text-[1.6rem] custom-1900:text-[1.9rem] custom-2500:text-[2.4rem]"
						>
							Tipo de riego
						</label>

						<select
							id="irrigationType"
							{...formik.getFieldProps("irrigationType")}
							className="outline-none px-[0.4rem] pt-[0rem] w-[100%] text-[0.8rem] placeholder-grey500 placeholder:text-[0.7rem] rounded-md
								custom-500:p-[0.9rem_1rem_0.6rem] custom-700:p-[1.1rem_1.1rem_0.6rem] custom-1000:p-[1.4rem_1.4rem_0.6rem] custom-1400:p-[1.6rem_1.6rem_0.4rem] custom-1900:p-[1.8rem_1.8rem_1rem] custom-2500:p-[2rem_2rem_1.3rem]
								custom-500:text-[1.2rem] custom-900:text-[1.5rem] custom-1400:text-[1.6rem] custom-1900:text-[2.2rem] custom-2500:text-[2.6rem]
								custom-500:placeholder:text-[1.1rem] custom-700:placeholder:text-[1.2rem] custom-900:placeholder:text-[1.4rem] custom-1400:placeholder:text-[1.6rem] custom-1900:placeholder:text-[1.9rem] custom-2500:placeholder:text-[2.5rem]"
						>
							<option value="" selected disabled className="text-grey500">
								Selecciona tu sistema de riego
							</option>
							<option value="Riego por goteo">Riego por goteo</option>
							<option value="Riego por aspersión">Riego por aspersión</option>
							<option value="Riego por superficie">Riego por superficie</option>
							<option value="Riego hidropónico">Riego hidropónico</option>
							<option value="Riego manual">Riego manual</option>
						</select>

						{formik.touched.irrigationType && formik.errors.irrigationType ? (
							<p
								className="absolute bottom-[0.6rem] right-[-60%] ml-4 text-[0.5rem] text-red-600
								custom-2500:bottom-[2rem]
								custom-390:right-[-60%] custom-1900:right-[-50%]
								custom-390:text-[0.7rem] custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1900:text-[1.7rem] custom-2500:text-[2.3rem]"
							>
								{formik.errors.irrigationType}
							</p>
						) : null}
					</div>

					{/* PRODUCTION INPUT */}

					<div
						className="relative w-[58%] mt-[1.2rem] border border-black border-solid rounded-md shadow-below-light
						custom-1400:w-[46%]
						custom-500:mt-[2rem] custom-700:mt-[2.5rem] custom-1000:mt-[3rem] custom-1400:mt-[3.2rem] custom-2500:mt-[4rem]"
					>
						<label
							htmlFor="productionType"
							className="absolute top-[-0.5rem] left-[1.5rem] px-[0.3rem] text-[0.6rem] bg-white
							custom-900:px-[0.6rem]
							custom-500:top-[-0.8rem] custom-700:top-[-1rem] custom-1200:top-[-1.1rem] custom-1400:top-[-1.2rem] custom-1900:top-[-1.5rem] custom-2500:top-[-2rem]
							custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1400:text-[1.6rem] custom-1900:text-[1.9rem] custom-2500:text-[2.4rem]"
						>
							Tipo de producción
						</label>

						<select
							id="productionType"
							{...formik.getFieldProps("productionType")}
							className="outline-none px-[0.4rem] pt-[0rem] w-full text-[0.8rem] placeholder-grey500 placeholder:text-[0.7rem] rounded-md
								custom-500:p-[0.9rem_1rem_0.6rem] custom-700:p-[1.1rem_1.1rem_0.6rem] custom-1000:p-[1.4rem_1.4rem_0.6rem] custom-1400:p-[1.6rem_1.6rem_0.4rem] custom-1900:p-[1.8rem_1.8rem_1rem] custom-2500:p-[2rem_2rem_1.3rem]
								custom-500:text-[1.2rem] custom-900:text-[1.5rem] custom-1400:text-[1.6rem] custom-1900:text-[2.2rem] custom-2500:text-[2.6rem]
								custom-500:placeholder:text-[1.1rem] custom-700:placeholder:text-[1.2rem] custom-900:placeholder:text-[1.4rem] custom-1400:placeholder:text-[1.6rem] custom-1900:placeholder:text-[1.9rem] custom-2500:placeholder:text-[2.5rem]"
						>
							<option value="" selected disabled className="text-grey500">
								Selecciona el tipo de producción
							</option>
							<option value="Familiar">Familiar</option>
							<option value="Comunitaria">Comunitaria</option>
							<option value="Comerciales">Comercial</option>
						</select>

						{formik.touched.productionType && formik.errors.productionType ? (
							<p
								className="absolute bottom-[0.6rem] right-[-60%] ml-4 text-[0.5rem] text-red-600
								custom-2500:bottom-[2rem]
								custom-390:right-[-60%] custom-1900:right-[-50%]
								custom-390:text-[0.7rem] custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1900:text-[1.7rem] custom-2500:text-[2.3rem]"
							>
								{formik.errors.productionType}
							</p>
						) : null}
					</div>
				</div>

				{/* FOURTH SECTION */}

				<div
					className="w-full mt-[1.6rem] pt-[0.9rem] pb-[0.5rem] px-[1.7rem] border-grey300 border-[1px] border-solid rounded-lg shadow-below-light
					custom-500:mt-[2.5rem] custom-900:mt-[3.5rem] custom-1400:mt-[4rem] custom-1900:mt-[6rem] custom-2500:mt-[8rem]
					custom-500:pt-[1.2rem] custom-700:pt-[1.7rem] custom-900:pt-[2rem] custom-1400:pt-[2.4rem] custom-1900:pt-[3rem] custom-2500:pt-[4rem]
					custom-500:pb-[1rem] custom-700:pb-[1.3rem] custom-1400:pb-[1.5rem] custom-1900:pb-[2.5rem]
					custom-500:px-[2rem] custom-700:px-[2.7rem] custom-900:px-[3.5rem] custom-1400:px-[4.5rem] custom-1900:px-[7rem] custom-2500:px-[9rem]"
				>
					<h2
						className="text-[1.2rem] font-bold drop-shadow-bigText
						custom-500:text-[2rem] custom-900:text-[2.4rem] custom-1200:text-[3rem] custom-1400:text-[3.2rem] custom-1900:text-[3.7rem] custom-2500:text-[4.5rem]"
					>
						Detalles de la publicación
					</h2>
					<p
						className="mt-[0.5rem] text-[0.6rem] drop-shadow-smallText
						custom-900:mt-[0.9rem] custom-1400:mt-[1.2rem]
						custom-500:text-[1rem] custom-900:text-[1.2rem] custom-1200:text-[1.4rem] custom-1400:text-[1.6rem] custom-1900:text-[2rem] custom-2500:text-[2.4rem]"
					>
						Información adicional sobre la huerta, es opcional si quiere sumar mas información sobre tu publicación
					</p>

					{/* ADDRESS INPUT */}

					<div
						className="relative w-[46%] mt-[2.4rem] border border-black border-solid rounded-md shadow-below-light
						custom-500:mt-[3rem] custom-900:mt-[4rem] custom-1200:mt-[5rem] custom-1400:mt-[6.3rem]"
					>
						<label
							htmlFor="address"
							className="absolute top-[-0.5rem] left-[1.5rem] px-[0.3rem] text-[0.6rem] bg-white
							custom-900:px-[0.6rem]
							custom-500:top-[-0.8rem] custom-700:top-[-1rem] custom-1200:top-[-1.1rem] custom-1400:top-[-1.2rem] custom-1900:top-[-1.5rem] custom-2500:top-[-2rem]
							custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1400:text-[1.6rem] custom-1900:text-[1.9rem] custom-2500:text-[2.4rem]"
						>
							Ubicación
						</label>

						<input
							type="text"
							id="address"
							placeholder="ingresa dirección de tu huerta"
							{...formik.getFieldProps("address")}
							className="outline-none px-[0.4rem] pt-[0rem] w-full text-[0.8rem] placeholder-grey500 placeholder:text-[0.7rem] rounded-md
								custom-500:p-[0.9rem_1rem_0.6rem] custom-700:p-[1.1rem_1.1rem_0.6rem] custom-1000:p-[1.4rem_1.4rem_0.6rem] custom-1400:p-[1.6rem_1.6rem_0.4rem] custom-1900:p-[1.8rem_1.8rem_1rem] custom-2500:p-[2rem_2rem_1.3rem]
								custom-500:text-[1.2rem] custom-700:text-[1.4rem] custom-900:text-[1.6rem] custom-1400:text-[1.7rem] custom-1900:text-[2.2rem] custom-2500:text-[2.6rem]
								custom-500:placeholder:text-[1.1rem] custom-700:placeholder:text-[1.2rem] custom-900:placeholder:text-[1.4rem] custom-1400:placeholder:text-[1.6rem] custom-1900:placeholder:text-[1.9rem] custom-2500:placeholder:text-[2.5rem]"
						/>

						{formik.touched.address && formik.errors.address ? (
							<p
								className="absolute bottom-[0.6rem] right-[-80%] ml-4 text-[0.5rem] text-red-600
								custom-2500:bottom-[2rem]
								custom-390:right-[-75%] custom-1900:right-[-50%]
								custom-390:text-[0.7rem] custom-500:text-[1rem] custom-700:text-[1.2rem] custom-900:text-[1.4rem] custom-1900:text-[1.7rem] custom-2500:text-[2.3rem]"
							>
								{formik.errors.address}
							</p>
						) : null}
					</div>

					{/* LOCATION MAP */}

					<div
						className="z-0 w-[97%] h-[10rem] mt-[1.2rem]
						custom-500:h-[14rem] custom-900:h-[26.5rem] custom-1900:h-[38rem] custom-2500:h-[50rem]
						custom-500:mt-[2rem] custom-900:mt-[3.2rem] custom-2500:mt-[4rem]
						custom-900:shadow-below-dark"
					>
						<GeoViewer
							addressString={formik.values.address}
							plantationName={formik.values.title}
							addressCoordinates={addressCoordinates}
							isGeomapInfoLoaded={isGeomapInfoLoaded.current}
						/>
					</div>
				</div>

				<div
					className="flex justify-between mx-auto w-[70%] mt-[3.2rem]
					custom-900:mt-[6.4rem] custom-1900:mt-[8rem] custom-2500:mt-[10rem]"
				>
					<Button
						buttonColor="yellow"
						buttonFontSize="text-[1.2rem] custom-500:text-[1.5rem] custom-900:text-[2rem] custom-1400:text-[2.4rem] custom-1900:text-[3.2rem] custom-2500:text-[4rem]"
						buttonPaddingY="py-[0.8rem] custom-500:py-[1rem] custom-900:py-[1.2rem] custom-1400:py-[1.4rem] custom-1900:py-[2rem]"
						buttonWidth="w-[10.6rem] custom-500:w-[14rem] custom-900:w-[17rem] custom-1400:w-[19.8rem] custom-1900:w-[30rem] custom-2500:w-[40rem]"
						buttonFuncionality={previewButtonFuncionality}
					/>

					<Button
						buttonColor="yellow"
						buttonFontSize="text-[1.2rem] custom-500:text-[1.5rem] custom-900:text-[2rem] custom-1400:text-[2.4rem] custom-1900:text-[3.2rem] custom-2500:text-[4rem]"
						buttonPaddingY="py-[0.8rem] custom-500:py-[1rem] custom-900:py-[1.2rem] custom-1400:py-[1.4rem] custom-1900:py-[2rem]"
						buttonWidth="w-[10.6rem] custom-500:w-[14rem] custom-900:w-[17rem] custom-1400:w-[19.8rem] custom-1900:w-[30rem] custom-2500:w-[40rem]"
						buttonFuncionality={submitButtonFuncionality}
					/>
				</div>
			</form>

			{previewVisibility === true && (
				<PublicationPreview
					handleClose={hidePreview}
					mainImage={formik.values.mainImg[0]}
					title={formik.values.title}
					productionType={formik.values.productionType}
					mainText={formik.values.details}
				/>
			)}
		</div>
	);
}

export default CreatePublicationForm;
