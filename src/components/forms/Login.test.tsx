import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import user from "@testing-library/user-event";
import Home from "../../pages/common/Home";
import LoginRegisterPage from "../../pages/common/LoginRegisterPage";

const handleSubmitMock = vi.fn();
const handleRegisterClickMock = vi.fn();
const closeErrorMessagesMock = vi.fn();
const loginStateInit = "init";
const loginStateLoading = "loading";
const loginStateLoginError = "loginError";
const loginStateNetError = "networkError";

user.setup();

// TESTS

describe("Component Rendering", () => {
	it("Renders correctly it´s init state", () => {
		render(
			<Login
				handleSubmit={handleSubmitMock}
				handleRegisterClick={handleRegisterClickMock}
				closeErrorMessages={closeErrorMessagesMock}
				loginState={loginStateInit}
			/>,
			{ wrapper: BrowserRouter }
		);

		const homeLink = screen.getByTestId("Login_to_Home_Link");
		const emailField = screen.getByPlaceholderText(/Correo Electrónico/i);
		const passwordField = screen.getByPlaceholderText(/Contraseña/i);
		const submitButton = screen.getByRole("button", { name: /Iniciar Sesión/i });
		const registerLink = screen.getByRole("link", { name: /REGÍSTRATE/i });

		expect(homeLink).toBeInTheDocument();
		expect(emailField).toBeInTheDocument();
		expect(passwordField).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
		expect(registerLink).toBeInTheDocument();
	});

	it("Renders correctly it´s loading state", () => {
		render(
			<Login
				handleSubmit={handleSubmitMock}
				handleRegisterClick={handleRegisterClickMock}
				closeErrorMessages={closeErrorMessagesMock}
				loginState={loginStateLoading}
			/>,
			{ wrapper: BrowserRouter }
		);

		const loadingComponentHeader = screen.getByRole("heading", { level: 3, name: /esperando respuesta del servidor/i });
		const progresBar = screen.getByRole("progressbar");

		expect(loadingComponentHeader).toBeInTheDocument();
		expect(progresBar).toBeInTheDocument();
	});

	it("Renders correctly it´s loginError state", () => {
		render(
			<Login
				handleSubmit={handleSubmitMock}
				handleRegisterClick={handleRegisterClickMock}
				closeErrorMessages={closeErrorMessagesMock}
				loginState={loginStateLoginError}
			/>,
			{ wrapper: BrowserRouter }
		);

		const loginErrorParagraph = screen.getByText(/Email \/ Clave Incorrectos/i);
		expect(loginErrorParagraph).toBeInTheDocument();
	});

	it("Renders correctly it´s networkError state", () => {
		render(
			<Login
				handleSubmit={handleSubmitMock}
				handleRegisterClick={handleRegisterClickMock}
				closeErrorMessages={closeErrorMessagesMock}
				loginState={loginStateNetError}
			/>,
			{ wrapper: BrowserRouter }
		);

		const networkErrorComponentHeader = screen.getByRole("heading", {
			level: 3,
			name: /Hubo un problema al intentar/i
		});
		expect(networkErrorComponentHeader).toBeInTheDocument();
	});

	it("In the init state there are no elements of other states", () => {
		render(
			<Login
				handleSubmit={handleSubmitMock}
				handleRegisterClick={handleRegisterClickMock}
				closeErrorMessages={closeErrorMessagesMock}
				loginState={loginStateInit}
			/>,
			{ wrapper: BrowserRouter }
		);

		const loadingComponentHeader = screen.queryByRole("heading", {
			level: 3,
			name: /esperando respuesta del servidor/i
		});
		const progresBar = screen.queryByRole("progressbar");
		const loginErrorParagraph = screen.queryByText(/Email \/ Clave Incorrectos/i);
		const networkErrorComponentHeader = screen.queryByRole("heading", {
			level: 3,
			name: /Hubo un problema al intentar/i
		});

		expect(loadingComponentHeader).not.toBeInTheDocument();
		expect(progresBar).not.toBeInTheDocument();
		expect(loginErrorParagraph).not.toBeInTheDocument();
		expect(networkErrorComponentHeader).not.toBeInTheDocument();
	});
});

describe("Field validations", () => {
	beforeEach(() => {
		render(
			<Login
				handleSubmit={handleSubmitMock}
				handleRegisterClick={handleRegisterClickMock}
				closeErrorMessages={closeErrorMessagesMock}
				loginState={loginStateInit}
			/>,
			{ wrapper: BrowserRouter }
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("Email Field", () => {
		beforeEach(async () => {
			const passwordField = screen.getByPlaceholderText(/Contraseña/i);
			await user.click(passwordField);
			await user.keyboard("THeurip$09");
		});

		it("Does not accept blank value, shows error", async () => {
			const emailField = screen.getByPlaceholderText(/Correo Electrónico/i);
			const ingresoH1Element = screen.getByRole("heading", { level: 1 });

			await user.click(emailField);
			await user.click(ingresoH1Element);

			const emailFieldError = screen.getByText(/Debes completar este campo/i);

			expect(emailFieldError).toBeInTheDocument();
		});

		it("Does not accept blank value, the form is not submitted", async () => {
			const submitButton = screen.getByRole("button", { name: /Iniciar Sesión/i });
			await user.click(submitButton);

			expect(handleSubmitMock).not.toHaveBeenCalled();
		});

		it("The email must be in the correct format, shows error", async () => {
			const emailField = screen.getByPlaceholderText(/Correo Electrónico/i);
			const ingresoH1Element = screen.getByRole("heading", { level: 1 });

			await user.click(emailField);
			await user.keyboard("jsdkjsd.com");
			await user.click(ingresoH1Element);

			const emailFieldError = screen.getByText(/El formato no coincide con un email/i);

			expect(emailFieldError).toBeInTheDocument();
		});

		it("The email must be in the correct format, the form is not submitted", async () => {
			const emailField = screen.getByPlaceholderText(/Correo Electrónico/i);
			const submitButton = screen.getByRole("button", { name: /Iniciar Sesión/i });

			await user.click(emailField);
			await user.keyboard("jsdkjsd.com");
			await user.click(submitButton);

			expect(handleSubmitMock).not.toHaveBeenCalled();
		});

		it("The email should not be more than 30 characters, shows error", async () => {
			const emailField = screen.getByPlaceholderText(/Correo Electrónico/i);
			const ingresoH1Element = screen.getByRole("heading", { level: 1 });

			await user.click(emailField);
			await user.keyboard("123456789123456789123456789123456789@gmail.com");
			await user.click(ingresoH1Element);

			const emailFieldError = screen.getByText(/Máximo 30 caracteres/i);

			expect(emailFieldError).toBeInTheDocument();
		});

		it("The email should not be more than 30 characters, the form is not submitted", async () => {
			const emailField = screen.getByPlaceholderText(/Correo Electrónico/i);
			const submitButton = screen.getByRole("button", { name: /Iniciar Sesión/i });

			await user.click(emailField);
			await user.keyboard("123456789123456789123456789123456789@gmail.com");
			await user.click(submitButton);

			expect(handleSubmitMock).not.toHaveBeenCalled();
		});

		it("The form is submitted if the field has the correct format", async () => {
			const emailField = screen.getByPlaceholderText(/Correo Electrónico/i);
			const submitButton = screen.getByRole("button", { name: /Iniciar Sesión/i });

			await user.click(emailField);
			await user.keyboard("laurita25@gmail.com");
			await user.click(submitButton);

			expect(handleSubmitMock).toHaveBeenCalledTimes(1);
		});
	});

	describe("Password Field", () => {
		beforeEach(async () => {
			const emailField = screen.getByPlaceholderText(/Correo Electrónico/i);
			await user.click(emailField);
			await user.keyboard("laurita25@gmail.com");
		});

		it("Does not accept blank value, shows error", async () => {
			const passwordField = screen.getByPlaceholderText(/Contraseña/i);
			const ingresoH1Element = screen.getByRole("heading", { level: 1 });

			await user.click(passwordField);
			await user.click(ingresoH1Element);

			const passwordFieldError = screen.getByText(/Debes completar este campo/i);

			expect(passwordFieldError).toBeInTheDocument();
		});

		it("Does not accept blank value, the form is not submitted", async () => {
			const submitButton = screen.getByRole("button", { name: /Iniciar Sesión/i });

			await user.click(submitButton);

			expect(handleSubmitMock).not.toHaveBeenCalled();
		});
	});
});

describe("Submit form", () => {
	beforeEach(async () => {
		render(
			<Login
				handleSubmit={handleSubmitMock}
				handleRegisterClick={handleRegisterClickMock}
				closeErrorMessages={closeErrorMessagesMock}
				loginState={loginStateInit}
			/>,
			{ wrapper: BrowserRouter }
		);

		const passwordField = screen.getByPlaceholderText(/Contraseña/i);
		const emailField = screen.getByPlaceholderText(/Correo Electrónico/i);

		await user.click(emailField);
		await user.keyboard("laurita25@gmail.com");
		await user.click(passwordField);
		await user.keyboard("THeurip$09");
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("Submit the form when the fields are correct", async () => {
		const submitButton = screen.getByRole("button", { name: /Iniciar Sesión/i });

		await user.click(submitButton);

		expect(handleSubmitMock).toHaveBeenCalledTimes(1);
	});

	it("The values ​​sent are correct", async () => {
		const submitButton = screen.getByRole("button", { name: /Iniciar Sesión/i });
		const expectedParameters = {
			email: "laurita25@gmail.com",
			password: "THeurip$09"
		};

		await user.click(submitButton);

		expect(handleSubmitMock.mock.calls[0][0]).toEqual(expectedParameters);
	});
});

describe("Links to Register and Home", () => {
	beforeEach(async () => {
		render(
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginRegisterPage focus="login" />} />
				</Routes>
				{/* <Login handleSubmit={handleSubmitMock} handleRegisterClick={handleRegisterClickMock} closeErrorMessages={closeErrorMessagesMock} loginState={loginStateInit} /> */}
			</BrowserRouter>
		);
	});

	it("Links correctly with Home", async () => {
		//A causa de React Router DOM, comenzamos en "/" (Home), por lo que primero pulsamos el link a Login
		const loginLink = screen.getByRole("button", { name: /ingresar/i });
		await user.click(loginLink);

		const homeLink = screen.getByTestId("Login_to_Home_Link");
		let homeElement = screen.queryByRole("heading", { name: /testimonios de nuestros usuarios/i });

		expect(homeElement).not.toBeInTheDocument();

		await user.click(homeLink);

		homeElement = screen.getByRole("heading", { name: /testimonios de nuestros usuarios/i });
		expect(homeElement).toBeInTheDocument();
	});
});
