export function storeToken (token: string) {
	localStorage.setItem("userId", token);
}