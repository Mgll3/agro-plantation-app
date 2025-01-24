import axios from "axios";

export const axiosConfig = axios.create({
	// baseURL: "http://localhost:8080",
	// baseURL: "https://agro-plantation-app.onrender.com",
	// baseURL: "https://ec2-18-116-118-187.us-east-2.compute.amazonaws.com:8080",
	baseURL: "https://farw687lql.execute-api.us-east-2.amazonaws.com/dev",
	timeout: 8000
	// withCredentials: true
});
