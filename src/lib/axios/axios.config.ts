import axios from "axios";

export const axiosConfig = axios.create({
	// baseURL: "http://localhost:8080",
	// baseURL: "https://agro-plantation-app.onrender.com",
	baseURL: "http://ec2-18-116-118-187.us-east-2.compute.amazonaws.com:8080",
	timeout: 8000
	// withCredentials: true
});
