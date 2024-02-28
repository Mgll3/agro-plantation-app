import axios from "axios";
import { axiosConfig } from "../lib/axios/axios.config";


export async function getBestPublications ( axiosControler: AbortController ) {

	try{
		const response = await axiosConfig.get("/v1/publication/publications/top", {
			signal: axiosControler.signal
		});
		const userData = response.data;

		return userData;
	} catch (error) {
		if ( axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
	}
}