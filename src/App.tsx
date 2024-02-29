import { Route, Routes } from "react-router-dom";
import "./App.css";
import WrongPath from "./pages/WrongPath";
import ProtectedRouteUser from "./components/protectRoutes/ProtectedRouteUser";
import Home from "./pages/Home";
import PublicationsPage from "./pages/PublicationsPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";


function App() {

	return (
		<>
			<Routes>
				<Route path="*" element={<WrongPath />} />
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<LoginRegisterPage focus="login" />} />
				<Route path="/register" element={<LoginRegisterPage focus="register" />} />

				PROTECTED ROUTES
				<Route element={<ProtectedRouteUser />} >
					<Route path="/publications" element={<PublicationsPage />} />
					<Route path="/publications/:id" element={<PublicationsPage />} />
				</Route>
			</Routes >
		</>
	);
}

export default App;
