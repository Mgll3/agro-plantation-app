import { NewPublicationType } from "./formsTypes";
import * as Yup from "yup";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useFormik } from "formik";
import Button from "../button/Button";
import { ReactNode, useEffect, useRef, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import GeoViewer from "../geolocator/GeoViewer";
import { CoordinatesType } from "../../pages/admin/AdminPublicationDetails";
import { getAddressCoordinates } from "../../interfaces/geolocation/getAddressCoordinates";
import PublicationPreview from "../admin/createPublication/PublicationPreview";

type CreatePublicationFormProps = {
	handleSubmit: (formValues: NewPublicationType) => void;
};

function CreatePublicationForm({ handleSubmit }: CreatePublicationFormProps) {
	const [previewVisibility, setPreviewVisibility] = useState(false);
	const [numberOfImages, setNumberOfImages] = useState<number>(0);
	const [dragActive, setDragActive] = useState(false);
	const [addressCoordinates, setAddressCoordinates] = useState<CoordinatesType | undefined>({
		lat: -34.61315,
		lon: -58.37723
	});
	const [textAreaCharacters, setTextAreaCharacters] = useState(0);
	const textAreaElement = useRef<HTMLTextAreaElement>(null);
	const textAreaCharactersLeft = 3000 - textAreaCharacters;
	const inputFileElement = useRef<HTMLInputElement>(null);

	const axiosController = useRef<AbortController>();
	const changeGeoMapTimeout = useRef<number>(0);

	const previewButtonFuncionality = {
		actionText: "Vista Previa",
		handleClick: showPreview
	};

	const submitButtonFuncionality = {
		submitText: "Publicar"
	};

	function showPreview() {
		setPreviewVisibility(true);
	}

	function hidePreview() {
		setPreviewVisibility(false);
	}

	function clickInput() {
		inputFileElement.current?.click();
	}

	const initialValues: NewPublicationType = {
		files: [],
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
		files: Yup.array()
			.min(1, "Debes añadir al menos una imagen")
			.max(10, "Máximo 10 imágenes")
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
			.max(15, "Máximo 15 caracteres"),

		irrigationType: Yup.string()
			.required("Debes completar este campo")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.max(15, "Máximo 15 caracteres"),

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

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.files) {
			const newFiles = Array.from(event.currentTarget.files);
			const updatedFiles = [...formik.values.files, ...newFiles];
			formik.setFieldValue("files", updatedFiles);
		}
	};

	const handleDragOver = (event: React.DragEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setDragActive(true);
	};

	const handleDragLeave = (event: React.DragEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setDragActive(false);
	};

	const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setDragActive(false);
		const newFiles = Array.from(event.dataTransfer.files);
		const updatedFiles = [...formik.values.files, ...newFiles];
		formik.setFieldValue("files", updatedFiles);
	};

	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: handleSubmit,
		validationSchema,
		enableReinitialize: true
	});

	useEffect(() => {
		setNumberOfImages(formik.values.files.length);
		if (textAreaElement.current?.value.length) {
			setTextAreaCharacters(textAreaElement.current.value.length);
		}
	}, [formik.values.files, textAreaElement.current?.value.length]);

	useEffect(() => {
		axiosController.current = new AbortController();

		if (formik.values.address.length > 6) {
			clearTimeout(changeGeoMapTimeout.current);

			changeGeoMapTimeout.current = window.setTimeout(() => {
				getAddressCoordinates(axiosController.current!, formik.values.address)
					.then((coordinates) => {
						setAddressCoordinates(coordinates);
					})
					.catch(() => {
						setAddressCoordinates(undefined);
					});
			}, 2000);
		}

		return () => {
			clearTimeout(changeGeoMapTimeout.current);
		};
	}, [formik.values.address]);

	return (
		<div className="flex flex-col w-full">
			<form name="createPublicationForm" onSubmit={formik.handleSubmit} noValidate className="">
				{/* FIRST SECTION */}

				<div className="w-full py-[20px] px-[50px] border-grey300 border-[1px] border-solid rounded-md">
					<h2 className="text-[49px] font-semibold">Agregar imágenes</h2>
					<p className="text-[24px] font-normal">Imágenes</p>
					<p className="text-[16px] mt-[1rem]">Incorpora algunas fotos para dar a conocer tu huerta</p>

					<div className="flex flex-col items-center mt-[32px] px-[48px] py-[32px] bg-brown150 rounded-md">
						<div className="mt-[-1.5rem] text-grey500 text-[87px]">
							<ImageOutlinedIcon color="inherit" fontSize="inherit" />
						</div>
						<p className="mt-[22px] text-[24px] font-semibold">arrastra y coloca una imagen o</p>

						{/* UPLOAD PICTURES BUTTON */}

						<div className="relative flex flex-col items-center w-full">
							<button
								type="button"
								className={`relative flex flex-col items-center justify-end w-[190px] h-[65px] mt-[32px] ${dragActive ? "cursor-help opacity-60 scale-110" : "cursor-pointer"} border-[1px] border-grey700 border-solid rounded-lg bg-white duration-300`}
								onClick={clickInput}
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}
							>
								<div className="flex">
									<div className="text-black text-[18px]">
										<ImageOutlinedIcon color="inherit" fontSize="inherit" />
									</div>
									<p className="text-[19.78px] font-semibold p-0">Cargar Imagen</p>
								</div>
								<p className="mb-[3px] mt-[-5px] text-[12px] font-semibold">{`(${numberOfImages})`}</p>

								<input
									ref={inputFileElement}
									className={`absolute top-[0px] left-[0px] w-[1px] h-[1px] text-[1px] opacity-0  ${dragActive ? "cursor-move" : "cursor-pointer"}`}
									id="files"
									name="files"
									type="file"
									multiple
									onChange={handleFileChange}
								></input>
							</button>

							{formik.touched.files && formik.errors.files ? (
								<p className="absolute bottom-[20px] right-[-240px] w-full text-center text-[14px] text-red-600">
									{formik.errors.files as ReactNode}
								</p>
							) : null}
						</div>

						<div className="flex justify-between w-full mt-[32px] text-[14px] font-light">
							<p>. Puedes ingresar hasta 10 imágenes</p>
							<p>. Tamaño máximo de archivo: 10 MB</p>
							<p>. Archivos de imagen compatibles: JPEG o PNG</p>
						</div>
					</div>

					<div className="flex items-start mt-[32px] text-brightRed text-[20px]">
						<ErrorOutlineIcon color="inherit" fontSize="inherit" className="mt-[2px]" />
						<p className="ml-[5px] text-[16px] text-black">
							Importante: Recuerda que la primera foto que subas aparecerá como la principal. Las siguientes fotos
							tendrán menor relevancia.
						</p>
					</div>
				</div>

				{/* SECOND SECTION */}

				<div className="w-full mt-[40px] pt-[24px] pb-[12px] px-[50px] border-grey300 border-[1px] border-solid rounded-md">
					<h2 className="text-[49px] font-semibold">Descripción general de la publicación</h2>
					<p className="text-[24px] font-normal">Nombre de la publicación</p>
					<p className="text-[16px] mt-[1rem]">
						Escribí un título claro y descriptivo para indicar de qué se trata la publicación.
					</p>

					{/* TITLE INPUT */}

					<div className="relative w-[46%] mt-[45px] p-2 border border-black border-solid rounded-md">
						<label htmlFor="title" className="absolute top-[-12px] left-[15px] px-2 text-[16px] bg-white">
							Título
						</label>

						<input
							type="text"
							id="title"
							placeholder="Nombre de la publicación"
							{...formik.getFieldProps("title")}
							className="outline-none  p-[8px_8px_4px] w-full placeholder-grey500"
						/>

						{formik.touched.title && formik.errors.title ? (
							<p className="absolute bottom-[15px] right-[-220px] text-[14px] text-red-600 ml-4">
								{formik.errors.title}
							</p>
						) : null}
					</div>

					{/* DETAILS TEXTAREA */}

					<div className="relative w-[90%] mt-6 p-2 border border-black border-solid rounded-md">
						<label htmlFor="details" className="absolute top-[-12px] left-[15px] px-2 text-[16px] bg-white">
							Descripción
						</label>

						<textarea
							ref={textAreaElement}
							id="details"
							placeholder="Texto de la publicación"
							maxLength={3000}
							rows={7}
							{...formik.getFieldProps("details")}
							className="outline-none  p-[8px_8px_4px] w-full placeholder-grey500"
						/>

						{formik.touched.details && formik.errors.details ? (
							<p className="absolute bottom-[-30px] left-[40%] text-[14px] text-red-600 ml-4">
								{formik.errors.details}
							</p>
						) : null}
					</div>
					<p className="mt-2 text-darkGrayText text-[18px]">{`${textAreaCharacters} / ${textAreaCharactersLeft}`}</p>
				</div>

				{/* THIRD SECTION */}

				<div className="w-full mt-[40px] pt-[24px] pb-[50px] px-[50px] border-grey300 border-[1px] border-solid rounded-md">
					<h2 className="text-[35px] font-semibold">Detalles de la publicación</h2>
					<p className="text-[16px] mt-[1rem]">
						Información adicional sobre la huerta, es opcional si quiere sumar mas información sobre tu publicación
					</p>

					{/* AREA INPUT */}

					<div className="relative w-[46%] mt-[45px] p-2 border border-black border-solid rounded-md">
						<label htmlFor="area" className="absolute top-[-12px] left-[15px] px-2 text-[16px] bg-white">
							Superficie
						</label>

						<input
							type="text"
							id="area"
							placeholder="Tamaño de huerta"
							{...formik.getFieldProps("area")}
							className="outline-none  p-[8px_8px_4px] w-full placeholder-grey500"
						/>

						{formik.touched.area && formik.errors.area ? (
							<p className="absolute bottom-[15px] right-[-220px] text-[14px] text-red-600 ml-4">
								{formik.errors.area}
							</p>
						) : null}
					</div>

					{/* HARVEST TYPE INPUT */}

					<div className="relative w-[46%] mt-[45px] p-2 border border-black border-solid rounded-md">
						<label htmlFor="harvestType" className="absolute top-[-12px] left-[15px] px-2 text-[16px] bg-white">
							Tipo de cosecha
						</label>

						<input
							type="text"
							id="harvestType"
							placeholder="Por ejemplo: Verduras de estación"
							{...formik.getFieldProps("harvestType")}
							className="outline-none  p-[8px_8px_4px] w-full placeholder-grey500"
						/>

						{formik.touched.harvestType && formik.errors.harvestType ? (
							<p className="absolute bottom-[15px] right-[-220px] text-[14px] text-red-600 ml-4">
								{formik.errors.harvestType}
							</p>
						) : null}
					</div>

					{/* IRRIGATION INPUT */}

					<div className="relative w-[46%] mt-[45px] p-2 border border-black border-solid rounded-md">
						<label htmlFor="irrigationType" className="absolute top-[-12px] left-[15px] px-2 text-[16px] bg-white">
							Tipo de riego
						</label>

						<input
							type="text"
							id="irrigationType"
							placeholder="Por ejemplo: Por goteo, sistema casero"
							{...formik.getFieldProps("irrigationType")}
							className="outline-none  p-[8px_8px_4px] w-full placeholder-grey500"
						/>

						{formik.touched.irrigationType && formik.errors.irrigationType ? (
							<p className="absolute bottom-[15px] right-[-220px] text-[14px] text-red-600 ml-4">
								{formik.errors.irrigationType}
							</p>
						) : null}
					</div>

					{/* PRODUCTION INPUT */}

					<div className="relative w-[46%] mt-[45px] p-2 border border-black border-solid rounded-md">
						<label htmlFor="productionType" className="absolute top-[-12px] left-[15px] px-2 text-[16px] bg-white">
							Tipo de producción
						</label>

						<input
							type="text"
							id="productionType"
							placeholder="Por ejemplo: Consumo familiar"
							{...formik.getFieldProps("productionType")}
							className="outline-none  p-[8px_8px_4px] w-full placeholder-grey500"
						/>

						{formik.touched.productionType && formik.errors.productionType ? (
							<p className="absolute bottom-[15px] right-[-220px] text-[14px] text-red-600 ml-4">
								{formik.errors.productionType}
							</p>
						) : null}
					</div>
				</div>

				{/* FOURTH SECTION */}

				<div className="w-full mt-[40px] pt-[24px] pb-[11px] px-[50px] border-grey300 border-[1px] border-solid rounded-md">
					<h2 className="text-[32px] font-bold">Detalles de la publicación</h2>
					<p className="text-[16px] mt-[1rem]">
						Información adicional sobre la huerta, es opcional si quiere sumar mas información sobre tu publicación
					</p>

					{/* ADDRESS INPUT */}

					<div className="relative w-[46%] mt-[45px] p-2 border border-black border-solid rounded-md">
						<label htmlFor="address" className="absolute top-[-12px] left-[15px] px-2 text-[16px] bg-white">
							Ubicación
						</label>

						<input
							type="text"
							id="address"
							placeholder="ingresa dirección de tu huerta"
							{...formik.getFieldProps("address")}
							className="outline-none  p-[8px_8px_4px] w-full placeholder-grey500"
						/>

						{formik.touched.address && formik.errors.address ? (
							<p className="absolute bottom-[15px] right-[-220px] text-[14px] text-red-600 ml-4">
								{formik.errors.address}
							</p>
						) : null}
					</div>

					{/* LOCATION MAP */}

					<div className="z-0 w-[97%] h-[265px] mt-[32px]">
						<GeoViewer
							addressString={formik.values.address}
							plantationName={formik.values.title}
							addressCoordinates={addressCoordinates}
						/>
					</div>
				</div>

				<div className="flex justify-between mx-auto w-[70%] mt-20">
					<Button
						buttonColor="yellow"
						buttonFontSize="text-[24px]"
						buttonPaddingY="py-[16px]"
						buttonWidth="w-[208px]"
						buttonFuncionality={previewButtonFuncionality}
					/>

					<Button
						buttonColor="yellow"
						buttonFontSize="text-[24px]"
						buttonPaddingY="py-[16px]"
						buttonWidth="w-[208px]"
						buttonFuncionality={submitButtonFuncionality}
					/>
				</div>
			</form>

			{previewVisibility === true && (
				<PublicationPreview
					handleClose={hidePreview}
					mainImage={formik.values.files[0]}
					title={formik.values.title}
					productionType={formik.values.productionType}
					mainText={formik.values.details}
				/>
			)}
		</div>
	);
}

export default CreatePublicationForm;
