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