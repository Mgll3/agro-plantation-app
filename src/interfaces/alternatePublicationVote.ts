import axios from "axios";
import { axiosConfig } from "../lib/axios/axios.config";

export async function alternatePublicationVote(token: string, id: number, axiosControler: AbortController) {
	try {
		await axiosConfig.post(
			`/v1/publication/toggleVote/${id}`,
			{},
			{
				signal: axiosControler.signal,
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json"
				}
			}
		);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
	}
}
