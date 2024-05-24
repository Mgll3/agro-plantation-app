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
import ProtectedRouteAdmin from "./components/protectRoutes/ProtectedRouteAdmin";
import AdminPublications from "./pages/admin/AdminPublications";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminForum from "./pages/admin/AdminForum";
import Management from "./pages/management/Management";
import RegisterProducer from "./pages/producers/RegisterProducer";
import TermsAndConditions from "./components/placeholders/TermsAndConditions";
import PrivacyDeclaration from "./components/placeholders/PrivacyDeclaration";



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
				<Route path="/management" element={<Management />} />
				<Route path="/termsAndConditions" element={<TermsAndConditions />} />
				<Route path="/privacy" element={<PrivacyDeclaration />} />

				PROTECTED ROUTES
				<Route element={<ProtectedRouteUser />} >
					<Route path="/publications" element={<PublicationsPage />} />
					<Route path="/publications/:id" element={<PublicationsPage />} />
					<Route path="/producer/register" element={<RegisterProducer />} />
				</Route>

				<Route element={<ProtectedRouteAdmin />} >
					<Route path="/admin/publications" element={<AdminPublications />} />
					<Route path="/admin/publications/:id" element={<AdminPublications />} />
					<Route path="/admin/users" element={<AdminUsers />} />
					<Route path="/admin/forum" element={<AdminForum />} />
				</Route>
			</Routes >
		</>
	);
}

export default App;
