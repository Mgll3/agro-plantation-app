// REGISTER

export type LoginFormValuesType = {
	email: string,
	password: string,
}

export type RegisterFormValuesType = {
	userEmail: string,
	userPassword: string,
	userPasswordConfirm: string,
	userName: string,
	userLastName: string,
	// userAddressStreet: string,
	userAddressCity: string,
	userAddressProvince: string,
}

export type RegiserFormFieldsToSendType = {
	email: string,
	password: string,
	name: string,
	lastname: string,
	address: string
}


