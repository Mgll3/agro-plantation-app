import { Route, Routes } from "react-router-dom";
import "./App.css";
import WrongPath from "./pages/WrongPath";
import ProtectedRouteUser from "./components/protectRoutes/ProtectedRouteUser";
import Home from "./pages/Home";
import PublicationsPage from "./pages/PublicationsPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import Copyright from "./components/placeholders/Copyright";
import HelpDesk from "./components/placeholders/HelpDesk";
import Community from "./components/placeholders/Community";
import AboutUs from "./components/placeholders/AboutUs";


function App() {

	return (
		<>
			<Routes>
				<Route path="*" element={<WrongPath />} />
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<LoginRegisterPage focus="login" />} />
				<Route path="/register" element={<LoginRegisterPage focus="register" />} />
				<Route path="/copyright" element={<Copyright />} />
				<Route path="/helpdesk" element={<HelpDesk />} />
				<Route path="/community" element={<Community />} />
				<Route path="/company" element={<AboutUs />} />

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
