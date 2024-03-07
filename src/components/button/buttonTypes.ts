type ButtonSubmitType = {
	submitText: string
}

type ButtonActionType = {
	actionText: string,
	handleClick: () => void
}

type ButtonLinkType = {
	linkText: string,
	linkUrl: string,
}

export type ButtonColorType = "yellow" | "green" | "grey";

export type ButtonProps = {
	buttonColor: ButtonColorType,
	buttonFontSize: string,
	buttonWidth: string,
	buttonPaddingY: string,
	buttonFuncionality: ButtonActionType | ButtonLinkType | ButtonSubmitType;
}