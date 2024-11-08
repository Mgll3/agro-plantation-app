import { Route, Routes } from "react-router-dom";
import "./App.css";
import "leaflet/dist/leaflet.css";
import WrongPath from "./pages/common/WrongPath";
import ProtectedRouteUser from "./components/protectRoutes/ProtectedRouteUser";
import Home from "./pages/common/Home";
import LoginRegisterPage from "./pages/common/LoginRegisterPage";
import Copyright from "./components/placeholders/Copyright";
import HelpDesk from "./components/placeholders/HelpDesk";
import Community from "./components/placeholders/Community";
import AboutUs from "./components/placeholders/AboutUs";
import ProtectedRouteAdmin from "./components/protectRoutes/ProtectedRouteAdmin";
import AdminPublications from "./pages/admin/AdminPublications";
import Management from "./pages/management/Management";
import RegisterProducer from "./pages/user/RegisterProducer";
import TermsAndConditions from "./components/placeholders/TermsAndConditions";
import PrivacyDeclaration from "./components/placeholders/PrivacyDeclaration";
import AdminPublicationDetails from "./pages/admin/AdminPublicationDetails";
import ProtectedRouteProducer from "./components/protectRoutes/ProtectedRouteProducer";
import CreatePublication from "./pages/producers/CreatePublication";
import ProtectedRouteNonAdmin from "./components/protectRoutes/ProtectedRouteNonAdmin";
import AdminHome from "./pages/admin/AdminHome";
import ProtectedRouteUserProducer from "./components/protectRoutes/ProtectedRouteUserProducer";
import Publications from "./pages/common/publications/Publications";
import UserProducerPublicationDetails from "./pages/common/publications/UserProducerPublicationDetails";
import AdminUsers from "./pages/admin/AdminUsers";
import NextMVPPlaceholder from "./components/placeholders/NextMVPPlaceholder";

function App() {
	return (
		<>
			<Routes>
				<Route path="*" element={<WrongPath />} />
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

				{/* NON ADMIN ROUTES */}
				<Route element={<ProtectedRouteNonAdmin />}>
					<Route path="/" element={<Home />} />
				</Route>

				{/* USER ROUTES */}
				<Route element={<ProtectedRouteUser />}>
					<Route path="/user/registerProducer" element={<RegisterProducer />} />
					<Route path="/user/forum" element={<NextMVPPlaceholder />} />
				</Route>

				{/* PRODUCER ROUTES */}
				<Route element={<ProtectedRouteProducer />}>
					<Route path="/producer/publications/createPublication" element={<CreatePublication />} />
					<Route path="/producer/forum" element={<NextMVPPlaceholder />} />
				</Route>

				{/* ADMIN ROUTES */}
				<Route element={<ProtectedRouteAdmin />}>
					<Route path="/admin/home" element={<AdminHome />} />
					<Route path="/admin/publications" element={<AdminPublications />} />
					<Route path="/admin/publications/:id" element={<AdminPublications />} />
					<Route path="/admin/users" element={<AdminUsers />} />
					<Route path="/admin/forum" element={<NextMVPPlaceholder />} />
					<Route path="/admin/publications/details/:id" element={<AdminPublicationDetails />} />
				</Route>

				{/* USER & PRODUCER COMMON ROUTES */}
				<Route element={<ProtectedRouteUserProducer />}>
					<Route path="/user/publications" element={<Publications />} />
					<Route path="/user/publications/:id" element={<Publications />} />
					<Route path="/user/publications/details/:id" element={<UserProducerPublicationDetails />} />
					<Route path="/producer/publications" element={<Publications />} />
					<Route path="/producer/publications/:id" element={<Publications />} />
					<Route path="/producer/publications/details/:id" element={<UserProducerPublicationDetails />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
