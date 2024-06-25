import axios from "axios";
import { axiosConfig } from "../lib/axios/axios.config";

export async function changePublicationToPending(token: string, id: number, axiosControler: AbortController) {
	try {
		await axiosConfig.put(`/v1/publication/changeToPending/${id}`, {
			signal: axiosControler.signal,
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
	}
}
