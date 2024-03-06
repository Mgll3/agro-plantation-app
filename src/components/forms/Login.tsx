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
		<div className="w-[100%] font-sans flex h-[100vh] items-center justify-center rounded-2xl text-[#eaefd4f2]">
			<aside className="w-[35vw] h-[100vh] ">
				<div className="bg-[url('./public/images/inicio_y_registro.jpg')] w-[100%] h-[100%] bg-center bg-cover bg-no-repeat flex justify-end items-center">
					<h1 className="bg-[#EAE3C0] text-black font-semibold text-2xl font-sans p-[1rem_5rem] rounded-2xl translate-x-[14px] translate-y-[-20px]">Ingreso</h1>
					<p className="absolute bottom-0 p-[4px_4px] m-[1rem] bg-[#94B447] text-[#1B7E25] text-center text-[15px] rounded-md">Todos los derechos reservados para Plant-In &copy; <small>Marzo 2024</small></p>
				</div>
			</aside>
			<div>
				<form
					name="login"
					id="login"
					encType="multipart/form-data"
					onSubmit={handleSubmit}
					className="w-[65vw] h-[100vh] border-solid text-center flex flex-col justify-around items-center bg-[#EAE3C0] p-4 "
				>

					<div className="flex justify-center items-center gap-4 rounded-2xl text-2xl">
						<img src="images/LogoVerde.png" alt="logo"
							className=" bg-[transparent] w-[120px] h-[160px]" />
					</div>

					<div className="flex flex-col justify-center items-center p-[1rem_0]">
						<label htmlFor="loginEmail"><input type="email" id="loginEmail" name="userEmail" required placeholder="Correo Electrónico"
							className="bg-[transparent] outline-none  border-b-[1px] border-b-[#00000038] mb-[5rem] p-[0_12px] w-[300px] text-black"
						></input></label>


						<label htmlFor="loginPassword"><input type="password" id="loginPassword" name="userPassword" required placeholder="Contraseña" className="bg-[transparent] outline-none  border-b-[1px] border-b-[#00000038] p-[0_12px] w-[300px] text-black"></input></label>

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
						buttonWidth="w-[300px]"
						buttonPaddingY="py-2.5"
						buttonMargin=""
						buttonFuncionality={{ submitText: "Iniciar Sesión" }}
					/>


					<p className="text-black font-sans">Si no tienes una cuenta, por favor <span onClick={handleRegisterClick} className="text-brandingLightGreen" role="button" >REGÍSTRATE</span></p>
				</form>
			</div>
		</div>
	);
}
