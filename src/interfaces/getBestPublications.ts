import axios from "axios";
import { axiosConfig } from "../../lib/axios/axios.config";

export async function getBestPublications ( axiosControler: AbortController ) {

	try{
		const response = await axiosConfig.get("/publications/best", {
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