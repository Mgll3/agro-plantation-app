export function getStoredName () {
	const userName = localStorage.getItem("userName");
	
	if (userName) {
		return userName;
	} else {
		return null;
	}
}