import { PublicationType } from "../../components/publicationsList/publicationsListTypes";

export function sortPublicationsByScore (publications: PublicationType[]) {
	const publicationsJson = JSON.stringify(publications);
	const publicationsDeepCopy= JSON.parse(publicationsJson);


	publicationsDeepCopy.sort( (a: PublicationType, b: PublicationType) => {
		const scoreA = a.score;
		const scoreB = b.score;

		// Si son iguales, devolveremos 0. El elemento mantendrá la posición que tenía.
		// Si "a" debe ir ordenado antes que "b", entonces devolvemos un número menor que 0.
		// Si "a" debe ir ordenado después que "b", entonces devolvemos un número mayor que 0.

		if (scoreA < scoreB) return 1;
		if (scoreA > scoreB) return -1;
		if (scoreA === scoreB) return 0;
	});

	return publicationsDeepCopy;
}