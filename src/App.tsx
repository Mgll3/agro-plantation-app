import { Route, Routes } from "react-router-dom";
import "./App.css";
import "leaflet/dist/leaflet.css";
import WrongPath from "./pages/WrongPath";
import ProtectedRouteUser from "./components/protectRoutes/ProtectedRouteUser";
import Home from "./pages/Home";
import UserPublications from "./pages/user/UserPublications";
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
import RegisterProducer from "./pages/user/RegisterProducer";
import TermsAndConditions from "./components/placeholders/TermsAndConditions";
import PrivacyDeclaration from "./components/placeholders/PrivacyDeclaration";
import AdminPublicationDetails from "./pages/admin/AdminPublicationDetails";
import ProtectedRouteProducer from "./components/protectRoutes/ProtectedRouteProducer";
import CreatePublication from "./pages/producers/CreatePublication";

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

				{/* PROTECTED ROUTES */}

				{/* USER RUTES */}
				<Route element={<ProtectedRouteUser />}>
					<Route path="/user/publications" element={<UserPublications />} />
					<Route path="/user/publications/:id" element={<UserPublications />} />
					<Route path="/user/registerProducer" element={<RegisterProducer />} />
				</Route>

				{/* PRODUCER RUTES */}
				<Route element={<ProtectedRouteProducer />}>
					<Route path="/producer/publications/createPublication" element={<CreatePublication />} />
				</Route>

				{/* ADMIN RUTES */}
				<Route element={<ProtectedRouteAdmin />}>
					<Route path="/admin/publications" element={<AdminPublications />} />
					<Route path="/admin/publications/:id" element={<AdminPublications />} />
					<Route path="/admin/users" element={<AdminUsers />} />
					<Route path="/admin/forum" element={<AdminForum />} />
					<Route path="/admin/publications/details/:id" element={<AdminPublicationDetails />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
