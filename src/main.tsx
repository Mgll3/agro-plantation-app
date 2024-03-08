import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserRoleProvider } from "./context/UserRoleContext.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<UserRoleProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</UserRoleProvider>
	</React.StrictMode>
);
