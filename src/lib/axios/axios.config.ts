import axios from "axios";

export const axiosConfig = axios.create({
	// baseURL: "http://localhost:8080",
	baseURL: "https://agro-plantation-app.onrender.com",
	timeout: 8000
	// withCredentials: true
});
