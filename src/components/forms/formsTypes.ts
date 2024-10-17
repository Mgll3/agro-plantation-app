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

//REGISTER NEW PRODUCER

export type RegisterProducerFormValuesType = {
	gardenName: string;
	gardenAddress: string;
	gardenSize: string;
	description: string;
	termsAccepted: string;
};

// CREATE NEW PUBLICATION (DATA USED IN THE FORM)

export type NewPublicationType = {
	mainImg: File[];
	images: File[];
	title: string;
	details: string;
	area: string;
	harvestType: string;
	irrigationType: string;
	productionType: string;
	address: string;
};

//CREATE NEW PUBLICATION (DATA SEND TO SERVER)
export type NewPublicationDataServerFormattedType = {
	title: string;
	plantation: {
		area: string;
		harvestType: string;
		irrigationType: string;
		productionType: string;
		details: string;
		address: string;
	};
};