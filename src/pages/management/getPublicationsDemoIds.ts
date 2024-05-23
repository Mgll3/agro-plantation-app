export function getPublicationsDemoIds () {
	const publicationsDemoIds = localStorage.getItem("publicationsDemoId");
	
	if (publicationsDemoIds !== null && publicationsDemoIds !== undefined && publicationsDemoIds !== "undefined" && publicationsDemoIds !== "") {
		return publicationsDemoIds;
	} else {
		return null;
	}
}