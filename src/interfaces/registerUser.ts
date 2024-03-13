import axios from "axios";
import { axiosConfig } from "../lib/axios/axios.config";

export async function registerUser ( data: string, axiosController: AbortController ) {

	try{
		const response = await axiosConfig.post("/auth/registro", data, {
			signal: axiosController.signal,
			headers: {
				"Content-Type": "application/json",
			}
		});
		const newUserToken = response.data;

		return newUserToken;
	} catch (error) {
		if ( axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
	}
}