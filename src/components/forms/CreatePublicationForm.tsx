type CreatePublicationFormProps = {
	handleSubmit: (formValues) => void;
};

function CreatePublicationForm({ handleSubmit }: CreatePublicationFormProps) {
	const noSpaceAtStartRegex = /^\S/g;
	const noSpaceEndingRegex = /\S$/g;
	const noSpecialCharacterRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ,.\s0-9]*$/g;

	const initialValues = {
		gardenName: "",
		gardenAddress: "",
		gardenSize: "",
		description: "",
		termsAccepted: ""
	};

	return <div className="w-full border-grey300 border-[1px] border-solid"></div>;
}

export default CreatePublicationForm;
