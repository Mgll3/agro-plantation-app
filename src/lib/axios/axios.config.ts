import axios from "axios";

export const axiosConfig = axios.create(
	{
		baseURL: "http://localhost:8080",
		timeout: 5000,
		withCredentials: true
	}
);