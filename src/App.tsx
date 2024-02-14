import { Route, Routes } from "react-router-dom";
import "./App.css";
import Button from "./components/button/Button";
import WrongPath from "./pages/WrongPath";

function App() {


	return (
		<>
			<Routes>
				<Route path="*" element={<WrongPath />} />
				{/* <Route path="/" element={<Home />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/publications" element={<PublicationsPage />} />
				<Route path="/publications/:id" element={<PublicationPage />} /> */}
			</Routes>
			<div>
				<Button text="Home" type="nav" buttonColor="yellow"></Button>
				<Button text="Publicaciones" type="nav" buttonColor="yellow"></Button>
				<Button text="Foro" type="nav" buttonColor="yellow"></Button>

			</div>
			<div>
				<Button text="Ingresar" type="register" buttonColor="yellow"></Button>
				<Button text="Regístrate" type="register" buttonColor="yellow"></Button>
			</div>
			<Button text="Regístrate" type="action" buttonColor="yellow"></Button>
		</>
	);
}

export default App;
