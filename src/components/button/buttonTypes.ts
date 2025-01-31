type ButtonSubmitType = {
	submitText: string;
};

type ButtonActionType = {
	actionText: string;
	handleClick: () => void;
};

type ButtonLinkType = {
	linkText: string;
	linkUrl: string;
};

export type ButtonColorType = "yellow" | "green" | "grey" | "red";

export type ButtonProps = {
	id?: string;
	buttonColor: ButtonColorType;
	buttonFontSize: string;
	buttonWidth: string;
	buttonPaddingY: string;
	disabled?: boolean;
	otherStyles?: string;
	buttonFuncionality: ButtonActionType | ButtonLinkType | ButtonSubmitType;
};
