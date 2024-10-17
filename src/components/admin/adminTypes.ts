export type UserType = {
	name: string;
	lastname: string;
	email: string;
	address: string;
	totalAuthorization: boolean;
	userType: {
		id: number;
		type: string;
	};
};

///////////////////////////////////////////////////////////////
// Tipos para las publicaciones en AdminPublications.
//////////////////////////////////////////////////////////////

export type MainImageType = {
	id: string;
	url: string;
};

type AuthorizationStateType = "ACCEPTED" | "DECLINED" | "PENDING";

type AuthorizationStatusType = {
	id: number;
	state: AuthorizationStateType;
};

export type AuthorType = {
	address: string;
	id: number;
	lastname: string;
	name: string;
	totalAuthorization: boolean;
};

type PlantationType = {
	id: number;
	area: string;
	harvestType: string;
	irrigationType: string;
	productionType: string;
	details: string;
};

//Estos tipos describe las publicaciones tal como se reciben del servidor. Sólo se describen los campos que realmente se van a usar desde el Front.
// Este tipo describe los campos de cada una de las publicaciones que se reciben del servidor
export type PublicationInfoType = {
	id: number;
	title: string;
	score: number;
	publicationDate: string;
	userVote: boolean;
	mainImage: MainImageType | null;
	images: MainImageType[] | null;
	authorizationStatus: AuthorizationStatusType;
	author: AuthorType;
	plantation: PlantationType;
};

//Este tipo describe el objeto que se recibe del servidor, con el array publications y la paginación.
export type AdminPublicationsFilteredType = {
	publications: PublicationInfoType[];
	pagination: number;
};

export type FilterType = "random" | "user" | "score" | "date" | "ammount" | "auth";

//Este tipo es el formato en el que se maqueta la información recibida del servidor, y es el que acepta el componente "Viewer"
export type FormattedPublicationsInfoType = {
	title: string;
	content: PublicationInfoType[];
};
