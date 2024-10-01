import axios from "axios";
import { axiosConfig } from "../../lib/axios/axios.config";

export async function getPendingProducerRequests(token: string, axiosControler: AbortController) {
	try {
		const response = await axiosConfig.get("/v1/producerRequest/pending", {
			signal: axiosControler.signal,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		});
		const pendingRequestsData = response.data;
		return pendingRequestsData;
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
