export type PublicationPreviewType = {
	id: number,
	author: string,
	mainImage: string,
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
	author: string,
	publicationDate: string,
	mainImage: string,
	comments: PublicationCommentType,
	score: number,
	mainText: string
}

export type PublicationsListType = {
	bestPublicationsArray: PublicationType[] 
}