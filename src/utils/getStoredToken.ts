export function getStoredToken () {
	const token = localStorage.getItem("userId");
	
	if (token) {
		return token;
	} else {
		return null;
	}
}