export function sortByRandom<T>(items: T[]) {
	const itemsJson = JSON.stringify(items);
	const itemsDeepCopy: T[] = JSON.parse(itemsJson);

	let currentIndex = itemsDeepCopy.length;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {

		// Pick a remaining element...
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[itemsDeepCopy[currentIndex], itemsDeepCopy[randomIndex]] = [itemsDeepCopy[randomIndex], itemsDeepCopy[currentIndex]];
	}

	return itemsDeepCopy;
}