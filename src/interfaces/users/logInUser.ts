import axios from "axios";
import { axiosConfig } from "../../lib/axios/axios.config";

export async function logInUser(formData: string, axiosController: AbortController) {
	try {
		const response = await axiosConfig.post("/auth/login", formData, {
			signal: axiosController.signal,
			headers: {
				"Content-Type": "application/json"
			}
		});
		const userData = response.data;

		return userData;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 401) {
				throw new Error("401");
			} else {
				throw new Error(error.message);
			}
		}
	}
}
