import axios from "axios";
import { axiosConfig } from "../lib/axios/axios.config";


export async function logOutUser ( axiosController: AbortController ) {

	try{
		await axiosConfig.get("/logout", {
			signal: axiosController.signal
		});
		
	} catch (error) {
		if ( axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
	}
}