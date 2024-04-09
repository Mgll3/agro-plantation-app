type AuthorType = {
	name: string,
	lastname: string
}

type MainImage = {
	id: string,
	url: string
}

type PublicationCommentType = {
	id: number,
	author: string,
	content: string,
	publicationDate: string
}

type PlantationType = {
	id: number,
	details: string
}



export type PublicationType = {
	id: number,
	title: string,
	author: AuthorType,
	publicationDate: Date,
	mainImage: MainImage,
	comments: PublicationCommentType,
	score: number,
	plantation: PlantationType
}

export type PublicationsPreviewListProps = {
	bestPublicationsArray: PublicationType[]
}