import axios from "axios";
import { axiosConfig } from "../lib/axios/axios.config";


export async function checkOpenSession ( token: string, axiosControler: AbortController ) {

	try{
		const response = await axiosConfig.post("/v1/user/userSession", token, {
			signal: axiosControler.signal,
			headers: {
				"Authorization": `Bearer ${token}`,
			}
		});
		const userData = response.data;

		return userData;
	} catch (error) {
		if ( axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
	}
}