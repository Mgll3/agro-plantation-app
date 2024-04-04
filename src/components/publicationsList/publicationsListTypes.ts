type AuthorType = {
	name: string,
	lastname: string
}

type MainImage = {
	id: string,
	url: string
}

type ImagesType = {
	id: string,
	url: string
}

type AuthorizationStatusType = {
	id: number,
	state: string
}


export type PublicationPreviewType = {
	id: number,
	author: AuthorType,
	mainImage: MainImage,
	title: string,
	mainText: string
}

export type PublicationsPreviewListProps = {
	bestPublicationsArray: PublicationPreviewType[]
}

type PublicationCommentType = {
	id: number,
	author: string,
	content: string,
	publicationDate: string
}

export type PublicationType = {
	id: number,
	title: string,
	author: AuthorType,
	publicationDate: Date,
	visibility: boolean,
	mainImage: MainImage,
	images: ImagesType,
	comments: PublicationCommentType,
	score: number,
	authorizationStatus: AuthorizationStatusType,
	mainText: string
}