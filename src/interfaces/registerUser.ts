import axios from "axios";
import { axiosConfig } from "../lib/axios/axios.config";

export async function registerUser ( formData: FormData, axiosController: AbortController ) {

	try{
		const response = await axiosConfig.post("/register", formData, {
			signal: axiosController.signal,
		});
		const newUserToken = response.data;

		return newUserToken;
	} catch (error) {
		if ( axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
	}
}