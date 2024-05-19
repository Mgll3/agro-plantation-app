import { useFormik } from "formik";
import *  as  Yup from "yup";
import Button from "../button/Button";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export type RegisterProducerFormValuesType = {
	plantationName: string,
	plantationAddress: string,
	plantationSize: string,
	plantationDescription: string,
	termsAccepted: string,
}

type RegisterProducerFormProps = {
	handleSubmit: (formValues: RegisterProducerFormValuesType) => void;
}

function RegisterProducerForm( {handleSubmit}: RegisterProducerFormProps) {
	const [textAreaCharacters, setTextAreaCharacters] = useState(0);
	const textAreaElement = useRef<HTMLTextAreaElement>(null);
	const textAreaCharactersLeft = 140 - textAreaCharacters;
	const submitButtonFuncionality = {
		submitText: "Enviar"
	};

	const noSpaceAtStartRegex = /^\S/g;
	const noSpaceEndingRegex = /\S$/g;
	const noSpecialCharacterRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ,.\s0-9]*$/g;

	const initialValues = {
		plantationName: "",
		plantationAddress: "",
		plantationSize: "",
		plantationDescription: "",
		termsAccepted: "",
	};

	const validationSchema = Yup.object({
		plantationName: Yup.string()
			.required("Debes completar este campo")
			.max(30, "Máximo 30 caracteres")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.min(2, "Al menos 2 caracteres"),

		plantationAddress: Yup.string()
			.required("Debes completar este campo")
			.max(120, "Máximo 120 caracteres")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.min(8, "Al menos 8 caracteres"),

		plantationSize: Yup.string()
			.required("Debes completar este campo"),

		plantationDescription: Yup.string()
			.required("Debes completar este campo")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.max(140, "Máximo 140 caracteres"),

		termsAccepted: Yup.string()
			.required("Debes aceptar las condiciones"),

	});

	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: handleSubmit,
		validationSchema
	});


	useEffect( () => {
		if (textAreaElement.current?.value.length) {
			setTextAreaCharacters(textAreaElement.current.value.length);
		}
	});
	

	return (
		<div className="">
			<form name="registerForm" onSubmit={formik.handleSubmit}
				className=""
			>

				{/* INPUTS */}

				<div className="flex justify-between mb-16">
					<div className="relative w-[46%] p-2 border border-black border-solid rounded-md">
						<label htmlFor="plantationName" className="absolute top-[-12px] left-[15px] px-2 text-[16px] bg-white">
							Nombre de tu huerta
						</label>

						<input type="text" id="plantationName" placeholder="Por ejemplo: Huerta del sol" { ...formik.getFieldProps("plantationName") }
							className="outline-none  p-[8px_8px_4px] w-full placeholder-[#666]" 
						/>

						{
							formik.touched.plantationName && formik.errors.plantationName
								? <p className="absolute bottom-[-25px] text-[14px] text-red-600 ml-4">{formik.errors.plantationName}</p>
								: null
						}
					</div>

					<div className="relative w-[46%] p-2 border border-black border-solid rounded-md">
						<label htmlFor="plantationAddress" className="absolute top-[-12px] left-[15px] px-2 text-[16px] bg-white">
							Dirección de tu huerta
						</label>

						<input type="text" id="plantationAddress" placeholder="Por ejemplo: Bermejo 356, Mendoza, Argentina" { ...formik.getFieldProps("plantationAddress") }
							className="outline-none  p-[8px_8px_4px] w-full placeholder-[#666]" 
						/>

						{
							formik.touched.plantationAddress && formik.errors.plantationAddress
								? <p className="absolute bottom-[-25px] text-[14px] text-red-600 ml-4">{formik.errors.plantationAddress}</p>
								: null
						}
					</div>
				</div>
				
				{/* RADIOS */}

				<p className="mb-8 text-[19.78px]">
					Tamaño de la huerta
				</p>

				<div className="flex items-center gap-10">
					<div className="flex">
						<input type="radio" name="plantationSize" id="familiar" value="familiar" onChange={formik.handleChange} onBlur={formik.handleBlur} 
							className="cursor-pointer" 
						/>
						<label htmlFor="familiar" className="ml-3 font-light cursor-pointer">Familiar</label>
					</div>

					<div className="flex">
						<input type="radio" name="plantationSize" id="comunitaria" value="comunitaria" onChange={formik.handleChange} onBlur={formik.handleBlur} 
							className="cursor-pointer" 
						/>
						<label htmlFor="comunitaria" className="ml-3 font-light cursor-pointer">Comunitaria</label>
					</div>

					<div className="flex">
						<input type="radio" name="plantationSize" id="comercial" value="comercial" onChange={formik.handleChange} onBlur={formik.handleBlur} 
							className="cursor-pointer" 
						/>
						<label htmlFor="comercial" className="ml-3 font-light cursor-pointer">Comerciales</label>
					</div>

					{
						formik.touched.plantationSize && formik.errors.plantationSize
							? <p className="text-[14px] text-red-600 ml-4">{formik.errors.plantationSize}</p>
							: null
					}
				</div>


				<p className="w-[67%] mt-8 text-darkGrayText">
					<span className="text-black text-[16]">
						-Huerta familiar:&nbsp;
					</span>
					Produce hortalizas para consumo propio, con riego y abono orgánico.
				</p>

				<p className="w-[67%] mt-2 text-darkGrayText">
					<span className="text-black text-[16]">
						-Huerta comunitaria:&nbsp;
					</span>
					Producen para consumo local en áreas protegidas o al aire libre, involucrando a muchas personas con un objetivo común.
				</p>

				<p className="w-[67%] mt-2 text-darkGrayText">
					<span className="text-black text-[16]">
						-Huerta comerciales:&nbsp;
					</span>
					Producen hortalizas en áreas extensas con labores manuales y mecánicas, empleando sistemas de riego y abonos naturales o caseros.
				</p>

				{/* TEXTAREA */}

				<p className="mt-16 text-[19.78px]">
					Cuéntanos un poco de tu huerta 
					<span className="text-reddishBrown">
						&nbsp;*
					</span>
				</p>

				<div className="relative w-[70%] mt-6 p-2 border border-black border-solid rounded-md">
					<label className="absolute top-[-12px] left-[15px] px-2 text-[16px] bg-white">
						Descripción
					</label>

					<textarea  ref={textAreaElement} id="plantationDescription" placeholder="Información adicional" maxLength={140} rows={6} { ...formik.getFieldProps("plantationDescription") }
						className="outline-none  p-[8px_8px_4px] w-full placeholder-[#666]" 
					/>

					{
						formik.touched.plantationDescription && formik.errors.plantationDescription
							? <p className="absolute bottom-[10px] left-[35%] text-[14px] text-red-600 ml-4">{formik.errors.plantationDescription}</p>
							: null
					}
				</div>


				<p className="my-4 text-darkGrayText text-[18px]">
					{`${textAreaCharacters} / ${textAreaCharactersLeft}`}
				</p>

				{/* CHECKBOX */}

				<div className="flex">
					<input type="checkbox" name="termsAccepted" id="termsAccepted" value="true" onChange={formik.handleChange} onBlur={formik.handleBlur} 
						className="scale-[180%]" 
					/>

					<label htmlFor="termsAccepted" className="ml-3 text-[18px] text-darkGrayText tracking-[0.38px]">
						Acepto los 
						<Link to="/termsAndConditions" target="_blank" className="text-blueLink">
							&nbsp;Términos y condiciones&nbsp;
						</Link>
						y autorizo el uso de mis datos de acuerdo a la
						<Link to="/privacy" target="_blank" className="text-blueLink">
						&nbsp;Declaración de privacidad.
						</Link>
					</label>
				</div>

				{
					formik.touched.termsAccepted && formik.errors.termsAccepted
						? <p className="absolute text-[14px] text-red-600 ml-4">{formik.errors.termsAccepted}</p>
						: null
				}

				<div className="flex justify-center w-full mt-20">
					<Button buttonColor="yellow" buttonFontSize="text-[24px]" buttonPaddingY="py-[16px]" buttonWidth="w-[208px]" buttonFuncionality={submitButtonFuncionality} />
				</div>

			</form>
		</div>
	);
}

export default RegisterProducerForm;
