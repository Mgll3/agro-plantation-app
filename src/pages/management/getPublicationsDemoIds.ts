export function getPublicationsDemoIds () {
	const publicationsDemoIds = localStorage.getItem("publicationsDemoId");
	
	if (publicationsDemoIds) {
		return publicationsDemoIds;
	} else {
		return null;
	}
}