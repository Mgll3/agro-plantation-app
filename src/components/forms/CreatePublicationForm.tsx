import { NewPublicationType } from "./formsTypes";
import * as Yup from "yup";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

type CreatePublicationFormProps = {
	handleSubmit: (formValues: NewPublicationType) => void;
};

function CreatePublicationForm({ handleSubmit }: CreatePublicationFormProps) {
	const initialValues = {
		files: null,
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
		files: Yup.mixed().required("A file is required"),
		// .test(
		// 	"fileSize",
		// 	"File too large",
		// 	(value) => value && value.size <= 1024 * 1024 // 1MB size limit
		// )
		// .test(
		// 	"fileType",
		// 	"Unsupported File Format",
		// 	(value) => value && ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
		// ),

		title: Yup.string()
			.required("Debes completar este campo")
			.max(30, "Máximo 30 caracteres")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.min(2, "Al menos 2 caracteres"),

		details: Yup.string()
			.required("Debes completar este campo")
			.max(120, "Máximo 120 caracteres")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.min(8, "Al menos 8 caracteres"),

		area: Yup.string().required("Debes completar este campo"),

		harvestType: Yup.string()
			.required("Debes completar este campo")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.max(140, "Máximo 140 caracteres"),

		irrigationType: Yup.string().required("Debes aceptar las condiciones"),

		productionType: Yup.string().required("Debes aceptar las condiciones"),

		address: Yup.string().required("Debes aceptar las condiciones")
	});

	//YUP VALIDATION END

	return (
		<div className="flex flex-col w-full">
			<div className="w-full py-[20px] px-[50px] border-grey300 border-[1px] border-solid rounded-md">
				<h2 className="text-[49px] font-semibold">Agregar imágenes</h2>
				<p className="text-[24px] font-normal">Imágenes</p>
				<p className="text-[16px] mt-[1rem]">Incorpora algunas fotos para dar a conocer tu huerta</p>

				<div className="flex flex-col items-center mt-[32px] px-[48px] py-[32px] bg-brown150 rounded-md">
					<div className="mt-[-1.5rem] text-grey500 text-[65px]">
						<ImageOutlinedIcon color="inherit" fontSize="inherit" />
					</div>
					<p className="mt-[32px] text-[24px] font-semibold">arrastra y coloca una imagen o</p>

					<div className="flex justify-between w-full mt-[32px] tex-[14px] font-light">
						<p>. Puedes ingresar hasta 10 imágenes</p>
						<p>. Tamaño máximo de archivo: 10 MB</p>
						<p>. Archivos de imagen compatibles: JPEG o PNG</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreatePublicationForm;
