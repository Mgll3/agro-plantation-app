import axios from "axios";
import { axiosConfig } from "../lib/axios/axios.config";

export async function logInUser ( formData: string, axiosController: AbortController ) {

	try{
		const response = await axiosConfig.post("/auth/login", formData, {
			signal: axiosController.signal
		});
		const userData = response.data;

		return userData;
	} catch (error) {
		if ( axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
	}
}