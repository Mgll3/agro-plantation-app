// REGISTER

export type LoginFormValuesType = {
	email: string;
	password: string;
};

export type RegisterFormValuesType = {
	userEmail: string;
	userPassword: string;
	userPasswordConfirm: string;
	userName: string;
	userLastName: string;
	// userAddressStreet: string,
	userAddressCity: string;
	userAddressProvince: string;
};

export type RegisterFormFieldsToSendType = {
	email: string;
	password: string;
	name: string;
	lastname: string;
	address: string;
};

// CREATE NEW PUBLICATION

export type NewPublicationType = {
	title: string;
	plantation: {
		area: string;
		harvestType: string;
		irrigationType: string;
		productionType: string;
		details: string;
	};
	visibility: false;
};
