import { Route, Routes } from "react-router-dom";
import "./App.css";
import WrongPath from "./pages/WrongPath";
import ProtectedRouteUser from "./components/protectRoutes/ProtectedRouteUser";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function App() {


	return (
		<>
			<Routes>
				<Route path="*" element={<WrongPath />} />
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />

				{/* PROTECTED ROUTES */}
				{/* <Route element={<ProtectedRouteUser />}>
					<Route path="/publications" element={<PublicationsPage />} />
					<Route path="/publications/:id" element={<PublicationPage />} />
				</Route> */}
			</Routes >
		</>
	);
}

export default App;
