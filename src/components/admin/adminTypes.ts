export type UserType = {
	name: string,
	lastname: string,
	email: string,
	address: string,
	totalAuthorization: boolean,
	userType: {
		id: number,
		type: string
	}
}

///////////////////////////////////////////////////////////////
// Tipos para las publicaciones en AdminPublications. 
//////////////////////////////////////////////////////////////

type MainImageType = {
	id: string,
	url: string
}

type AuthorizationStateType = "ACCEPTED" | "DECLINED"

type AuthorizationStatusType = {
	id: number,
	state: AuthorizationStateType
}

//Este tipo describe las publicaciones tal como se reciben del servidor. Sólo se describen los campos que realmente se van a usar desde el Front.
export type AdminPublicationsFilteredType = {
	id: number,
	title: string,
	score: number,
	mainImage: MainImageType | null,
	authorizationStatus: AuthorizationStatusType
}

export type FilterType = "random" | "user" | "score" | "date" | "ammount" | "auth";

//Este tipo es el formato en el que se maqueta la información recibida del servidor, y es el que acepta el componente "Viewer"
export type FormattedPublicationsInfoType = {
	title: string,
	content: AdminPublicationsFilteredType[]
}