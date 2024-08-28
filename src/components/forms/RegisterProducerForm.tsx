import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../button/Button";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RegisterProducerFormValuesType } from "./formsTypes";

type RegisterProducerFormProps = {
	handleSubmit: (formValues: RegisterProducerFormValuesType) => void;
};

function RegisterProducerForm({ handleSubmit }: RegisterProducerFormProps) {
	const [textAreaCharacters, setTextAreaCharacters] = useState(0);
	const textAreaElement = useRef<HTMLTextAreaElement>(null);
	const textAreaCharactersLeft = 140 - textAreaCharacters;
	const submitButtonFuncionality = {
		submitText: "Enviar"
	};

	const noSpaceAtStartRegex = /^\S/g;
	const noSpaceEndingRegex = /\S$/g;
	const noSpecialCharacterRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ,.\s0-9]*$/g;
	const trueValueRegex = /true/g;

	const initialValues = {
		gardenName: "",
		gardenAddress: "",
		gardenSize: "",
		description: "",
		termsAccepted: ""
	};

	const validationSchema = Yup.object({
		gardenName: Yup.string()
			.required("Debes completar este campo")
			.max(30, "Máximo 30 caracteres")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.min(2, "Al menos 2 caracteres"),

		gardenAddress: Yup.string()
			.required("Debes completar este campo")
			.max(120, "Máximo 120 caracteres")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.min(8, "Al menos 8 caracteres"),

		gardenSize: Yup.string().required("Debes completar este campo"),

		description: Yup.string()
			.required("Debes completar este campo")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.max(140, "Máximo 140 caracteres"),

		termsAccepted: Yup.string()
			.required("Debes aceptar las condiciones")
			.matches(trueValueRegex, "Debes aceptar las condiciones")
	});

	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: handleSubmit,
		validationSchema
	});

	useEffect(() => {
		if (textAreaElement.current?.value.length) {
			setTextAreaCharacters(textAreaElement.current.value.length);
		}
	});

	return (
		<div className="">
			<form name="registerForm" onSubmit={formik.handleSubmit} className="">
				{/* INPUTS */}

				<div
					className="flex flex-wrap justify-between mb-[3.4rem]
					custom-1400:flex-wrap
					custom-1400:justify-start
					custom-1400:gap-x-[9.6rem]
					custom-1000:mb-[5rem] custom-1400:mb-[6.4rem] custom-1900:mb-[8rem] custom-3500:mb-[12rem]"
				>
					<div
						className="relative w-[100%] p-[0.42rem] mb-[4.8rem] border border-black border-solid rounded-md
						custom-1000:p-[0.7rem] custom-1400:p-[0.8rem]
						custom-1000:mb-[0rem]
						custom-600:w-[95%] custom-1000:w-[44%] custom-2500:w-[40%]"
					>
						<label
							htmlFor="gardenName"
							className="absolute top-[-9px] left-[15px] px-2 text-[1.2rem] bg-white
							custom-600:top-[-11px] custom-1400:top-[-12px] custom-2500:top-[-17px] custom-3500:top-[-23px]
							custom-600:text-[1.4rem] custom-1000:text-[1.5rem] custom-1400:text-[1.6rem] custom-1900:text-[1.8rem] custom-2500:text-[2.1rem] custom-3500:text-[2.7rem]"
						>
							Nombre de tu huerta
						</label>

						<input
							type="text"
							id="gardenName"
							placeholder="Por ejemplo: Huerta del sol"
							{...formik.getFieldProps("gardenName")}
							className="outline-none  p-[4px_4px_2px] w-full placeholder-grey500 placeholder:text-[1.1rem]
								custom-600:p-[6px_6px_3px] custom-1400:p-[8px_8px_4px] custom-1900:p-[12px_12px_6px] custom-3500:p-[16px_16px_10px]
								custom-1200:text-[1.6rem] custom-1400:text-[1.8rem] custom-1900:text-[2rem] custom-2500:text-[2.3rem] custom-3500:text-[3.2rem]
								custom-390:placeholder:text-[1.4rem] custom-600:placeholder:text-[1.5rem] custom-1400:placeholder:text-[1.6rem] custom-1900:placeholder:text-[1.8rem] custom-2500:placeholder:text-[2rem] custom-3500:placeholder:text-[2.8rem]"
						/>

						{formik.touched.gardenName && formik.errors.gardenName ? (
							<p
								className="absolute bottom-[-25px] text-[1.3rem] text-red-600 ml-4
								custom-2500:bottom-[-34px] custom-3500:bottom-[-40px]
								custom-1000:text-[1.4rem] custom-1900:text-[1.6rem] custom-2500:text-[1.8rem] custom-3500:text-[2.4rem]"
							>
								{formik.errors.gardenName}
							</p>
						) : null}
					</div>

					<div
						className="relative w-[100%] p-[0.42rem] border border-black border-solid rounded-md
						custom-1000:p-[0.7rem] custom-1400:p-[0.8rem]
						custom-600:w-[95%] custom-1000:w-[44%] custom-2500:w-[40%]"
					>
						<label
							htmlFor="gardenAddress"
							className="absolute top-[-9px] left-[15px] px-2 text-[1.2rem] bg-white
							custom-600:top-[-11px] custom-1400:top-[-12px] custom-2500:top-[-17px] custom-3500:top-[-23px]
							custom-600:text-[1.4rem] custom-1000:text-[1.5rem] custom-1400:text-[1.6rem] custom-1900:text-[1.8rem] custom-2500:text-[2.1rem] custom-3500:text-[2.7rem]"
						>
							Dirección de tu huerta
						</label>

						<input
							type="text"
							id="gardenAddress"
							placeholder="Por ejemplo: Bermejo 356, Mendoza, Argentina"
							{...formik.getFieldProps("gardenAddress")}
							className="outline-none  p-[4px_4px_2px] w-full placeholder-grey500 placeholder:text-[1.1rem]
								custom-600:p-[6px_6px_3px] custom-1400:p-[8px_8px_4px] custom-1900:p-[12px_12px_6px] custom-3500:p-[16px_16px_10px]
								custom-1200:text-[1.6rem] custom-1400:text-[1.8rem] custom-1900:text-[2rem] custom-2500:text-[2.3rem] custom-3500:text-[3.2rem]
								custom-390:placeholder:text-[1.4rem] custom-600:placeholder:text-[1.5rem] custom-1400:placeholder:text-[1.6rem] custom-1900:placeholder:text-[1.8rem] custom-2500:placeholder:text-[2rem] custom-3500:placeholder:text-[2.8rem]"
						/>

						{formik.touched.gardenAddress && formik.errors.gardenAddress ? (
							<p
								className="absolute bottom-[-25px] text-[1.3rem] text-red-600 ml-4
								custom-2500:bottom-[-34px] custom-3500:bottom-[-40px]
								custom-1000:text-[1.4rem] custom-1900:text-[1.6rem] custom-2500:text-[1.8rem] custom-3500:text-[2.4rem]"
							>
								{formik.errors.gardenAddress}
							</p>
						) : null}
					</div>
				</div>

				{/* RADIOS */}

				<p
					className="hidden mb-[1rem] text-[1.6rem]
					custom-600:block
					custom-1000:mb-[1.4rem] custom-1400:mb-[1.6rem]
					custom-1000:text-[1.8rem] custom-1400:text-[1.978rem] custom-1900:text-[2.5rem] custom-2500:text-[3rem] custom-3500:text-[4rem]"
				>
					Tamaño de la huerta
				</p>

				<div
					className="flex flex-wrap items-center gap-x-[1.8rem] pl-[0rem] text-[1.1rem]
					custom-420:gap-x-[3.4rem] custom-1400:gap-x-[4rem] custom-1900:gap-x-[5rem] custom-3500:gap-x-[7rem]
					custom-500:pl-[1rem] custom-1400:pl-[1.4rem]
					custom-390:text-[1.4rem] custom-400:text-[1.6rem] custom-1000:text-[1.7rem] custom-1400:text-[1.978rem] custom-1900:text-[2.5rem] custom-2500:text-[2.8rem] custom-3500:text-[3rem]"
				>
					<div className="flex">
						<input
							type="radio"
							name="gardenSize"
							id="familiar"
							value="familiar"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="cursor-pointer
								custom-1900:scale-[1.4] custom-2500:scale-[1.6] custom-3500:scale-[1.7]"
						/>
						<label
							htmlFor="familiar"
							className="ml-[0.8rem] font-light cursor-pointer
							custom-1400:ml-[1.4rem]"
						>
							Familiar
						</label>
					</div>

					<div className="flex">
						<input
							type="radio"
							name="gardenSize"
							id="comunitaria"
							value="comunitaria"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="cursor-pointer
								custom-1900:scale-[1.4] custom-2500:scale-[1.6] custom-3500:scale-[1.7]"
						/>
						<label
							htmlFor="comunitaria"
							className="ml-[0.8rem] font-light cursor-pointer
							custom-1400:ml-[1.4rem]"
						>
							Comunitaria
						</label>
					</div>

					<div className="flex">
						<input
							type="radio"
							name="gardenSize"
							id="comercial"
							value="comercial"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="cursor-pointer
								custom-1900:scale-[1.4] custom-2500:scale-[1.6] custom-3500:scale-[1.7]"
						/>
						<label
							htmlFor="comercial"
							className="ml-[0.8rem] font-light cursor-pointer
							custom-1400:ml-[1.4rem]"
						>
							Comerciales
						</label>
					</div>

					{formik.touched.gardenSize && formik.errors.gardenSize ? (
						<p
							className="text-[1.3rem] text-red-600 ml-4
						custom-1000:text-[1.4rem] custom-1900:text-[1.6rem] custom-2500:text-[1.8rem] custom-3500:text-[2.4rem]"
						>
							{formik.errors.gardenSize}
						</p>
					) : null}
				</div>

				<div
					className="mt-[2.8rem] text-[1.4rem]
					custom-600:text-[1.5rem] custom-1400:text-[1.6rem] custom-1900:text-[1.9rem] custom-2500:text-[2.2rem] custom-3500:text-[2.6rem]"
				>
					<p
						className="w-[100%] text-darkGrayText
					custom-1400:w-[79.5%]"
					>
						<span className="text-black">-Huerta familiar:&nbsp;</span>
						Produce hortalizas para consumo propio, con riego y abono orgánico.
					</p>

					<p
						className="w-[100%] mt-[1.2rem] text-darkGrayText
						custom-1400:mt-[1.6rem] custom-1900:mt-[1.4rem]
						custom-1400:w-[79.5%]"
					>
						<span className="text-black">-Huerta comunitaria:&nbsp;</span>
						Producen para consumo local en áreas protegidas o al aire libre, involucrando a muchas personas con un
						objetivo común.
					</p>

					<p
						className="w-[100%] mt-[1.2rem] text-darkGrayText
						custom-1400:mt-[1.6rem] custom-1900:mt-[1.4rem]
						custom-1400:w-[79.5%]"
					>
						<span className="text-black">-Huerta comerciales:&nbsp;</span>
						Producen hortalizas en áreas extensas con labores manuales y mecánicas, empleando sistemas de riego y abonos
						naturales o caseros.
					</p>
				</div>

				{/* TEXTAREA */}

				<p
					className="mt-[4rem] text-[1.6rem]
					custom-1000:mt-[3.5rem] custom-1400:mt-[6.4rem] custom-3500:mt-[9rem]
					custom-1000:text-[1.8rem] custom-1400:text-[1.978rem] custom-1900:text-[2.5rem] custom-2500:text-[3rem] custom-3500:text-[4rem]"
				>
					Cuéntanos un poco de tu huerta
					<span className="text-reddishBrown">&nbsp;*</span>
				</p>

				<div
					className="relative w-[100%] mt-[0.8rem] p-2 border border-black border-solid rounded-2xl
					custom-1000:mt-[1.3rem] custom-1400:mt-[1.6rem] custom-2500:mt-[2.8rem] custom-3500:mt-[3.8rem]
					custom-1400:w-[79%]
					custom-1400:rounded-md"
				>
					<label
						htmlFor="description"
						className="absolute hidden top-[-12px] left-[15px] px-2 text-[1.2rem] bg-white
						custom-600:block
						custom-600:top-[-11px] custom-1400:top-[-12px] custom-2500:top-[-17px] custom-3500:top-[-23px]
						custom-600:text-[1.4rem] custom-1000:text-[1.5rem] custom-1400:text-[1.6rem] custom-1900:text-[1.8rem] custom-2500:text-[2.1rem] custom-3500:text-[2.7rem]"
					>
						Descripción
					</label>

					<textarea
						ref={textAreaElement}
						id="description"
						placeholder="Información adicional"
						maxLength={140}
						rows={window.innerWidth > 700 ? 6 : 13}
						{...formik.getFieldProps("description")}
						className="outline-none  p-[4px_4px_2px] w-full placeholder-grey500 placeholder:text-[1.1rem]
							custom-600:p-[6px_6px_3px] custom-1400:p-[8px_8px_4px] custom-1900:p-[12px_12px_6px] custom-3500:p-[16px_16px_10px]
							custom-1200:text-[1.6rem] custom-1400:text-[1.8rem] custom-1900:text-[2rem] custom-2500:text-[2.3rem] custom-3500:text-[3.2rem]
							custom-390:placeholder:text-[1.4rem] custom-600:placeholder:text-[1.5rem] custom-1400:placeholder:text-[1.6rem] custom-1900:placeholder:text-[1.8rem] custom-2500:placeholder:text-[2rem] custom-3500:placeholder:text-[2.8rem]"
					/>

					{formik.touched.description && formik.errors.description ? (
						<p
							className="absolute bottom-[10px] text-[1.3rem] text-red-600 ml-4
							custom-1000:text-[1.4rem] custom-1900:text-[1.6rem] custom-2500:text-[1.8rem] custom-3500:text-[2.4rem]"
						>
							{formik.errors.description}
						</p>
					) : null}
				</div>

				<p
					className="mb-[1.6rem] mt-[0.6rem] text-darkGrayText text-[1.4rem]
					custom-1900:mb-[2.6rem]
					custom-1000:mt-[1rem] custom-1400:mt-[1.6rem]
					custom-1000:text-[1.6rem] custom-1400:text-[1.8rem] custom-1900:text-[2rem] custom-2500:text-[2.2rem] custom-3500:text-[2.6rem]"
				>
					{`${textAreaCharacters} / ${textAreaCharactersLeft}`}
				</p>

				{/* CHECKBOX */}

				<div
					className="flex items-start
					custom-1400:items-center"
				>
					<input
						type="checkbox"
						name="termsAccepted"
						id="termsAccepted"
						value="true"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className="scale-[130%] mt-[0.5rem]
							custom-1400:scale-[180%] custom-3500:scale-[250%]
							custom-1400:mt-[0rem]"
					/>

					<label
						htmlFor="termsAccepted"
						className="ml-[0.9rem] text-[1.2rem] text-darkGrayText tracking-[0.38px]
						custom-2500:ml-[1.9rem] custom-3500:ml-[3rem]
						custom-600:text-[1.5rem] custom-1000:text-[1.6rem] custom-1400:text-[1.8rem] custom-1900:text-[2rem] custom-2500:text-[2.3rem] custom-3500:text-[2.8rem]"
					>
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

				{formik.touched.termsAccepted && formik.errors.termsAccepted ? (
					<p
						className="absolute text-[1.3rem] text-red-600 ml-[2.5rem]
						custom-1000:text-[1.4rem] custom-1900:text-[1.6rem] custom-2500:text-[1.8rem] custom-3500:text-[2.4rem]"
					>
						{formik.errors.termsAccepted}
					</p>
				) : null}

				<div
					className="flex justify-center w-full mt-[3.2rem]
					custom-1400:mt-[6.4rem] custom-2500:mt-[9rem] custom-3500:mt-[12rem]"
				>
					<Button
						buttonColor="yellow"
						buttonFontSize="text-[1.2rem] custom-500:text-[1.6rem] custom-900:text-[2rem] custom-1400:text-[2.4rem] custom-1900:text-[2.8rem] custom-2500:text-[3.3rem] custom-3500:text-[3.8rem]"
						buttonPaddingY="py-[0.8rem] custom-500:py-[1.2rem] custom-1400:py-[1.4rem] custom-3500:py-[1.9rem]"
						buttonWidth="w-[7.1rem] custom-500:w-[11rem] custom-900:w-[15rem] custom-1400:w-[20.8rem] custom-1900:w-[23rem] custom-2500:w-[30rem] custom-3500:w-[35rem]"
						buttonFuncionality={submitButtonFuncionality}
					/>
				</div>
			</form>
		</div>
	);
}

export default RegisterProducerForm;
