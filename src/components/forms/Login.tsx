import { LoginStateType } from "../../pages/LoginRegisterPage.tsx";
import Button from "../button/Button.tsx";
import { CircularProgress } from "@mui/material";

type LoginProps = {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
	handleRegisterClick: () => void,
	loginState: LoginStateType
}

export default function Login({ handleSubmit, handleRegisterClick, loginState }: LoginProps) {

	return (
		<div className="w-screen h-[450px] bg-huerta flex items-center justify-center rounded-2xl text-[#eaefd4f2]">
			<form
				name="login"
				id="login"
				encType="multipart/form-data"
				onSubmit={handleSubmit}
				className="w-[350px] h-[330px] border-solid text-center bg-[#86b155d6] p-4 rounded-2xl"
			>

				<div className="flex justify-center items-center gap-4 rounded-2xl text-2xl">
					<img src="images/huertas-logo.png" alt="logo"
						className="w-[35px] h-[35px] rounded-full border-solid border-2 border-[#78b632] ml-[-30px]" />
					<h2 className="">Ingresar</h2>
				</div>

				<div className="flex flex-col justify-center items-center p-[1rem_0]">
					<label htmlFor="loginEmail">Email</label>
					<input type="email" id="loginEmail" name="userEmail" required
						className="bg-[#94ff1b52] outline-none  border-b-[1px] border-b-[#60e848ca] mb-6 rounded-2xl p-[0_12px]"
					></input>

					<label htmlFor="loginPassword">Contraseña </label>
					<input type="password" id="loginPassword" name="userPassword" required className="bg-[#94ff1b52] outline-none  border-b-[1px] border-b-[#60e848ca] rounded-2xl p-[0_12px]"></input>
				</div>

				{
					loginState === "error" && <p className=" text-red-500 p-2">Email / Clave Incorrectos</p>
				}

				{
					loginState === "loading" && <CircularProgress color="success" />
				}

				<Button
					buttonColor="green"
					buttonFontSize="text-base"
					buttonWidth="w-full"
					buttonPaddingY="py-2.5"
					buttonFuncionality={{ submitText: "Inicio" }}
				/>


				<p>Si no tienes una cuenta, por favor <span onClick={handleRegisterClick} className="text-brandingLightGreen" role="button" >REGÍSTRATE</span></p>
			</form>
		</div>
	);
}
