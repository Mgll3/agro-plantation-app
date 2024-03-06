import { render, screen } from "@testing-library/react";
import Button from "./Button";
import { BrowserRouter } from "react-router-dom";

const actionButtonFuncionality = {
	actionText: "Action",
	handleClick: vi.fn()
};

const submitButtonFuncionality = {
	submitText: "Submit"
};

const linkButtonFuncionality = {
	linkText: "Link",
	linkUrl: "/login",
};



describe("All 3 types of buttons render correctly with different props", () => {
	it("Action type button is rendered", () => {
		render(<Button buttonColor="yellow" buttonFontSize="text-base" buttonWidth="w-53" buttonPaddingY="py-2.5" buttonFuncionality={actionButtonFuncionality} />);
		const actionButton = screen.getByRole("button", {name: "Action"});
		expect(actionButton).toBeInTheDocument();
	});

	it("Submit button is rendered", () => {
		render(<Button buttonColor="yellow" buttonFontSize="text-base" buttonWidth="w-53" buttonPaddingY="py-2.5" buttonFuncionality={submitButtonFuncionality} />);
		const submitButton = screen.getByRole("button", {name: "Submit"});
		expect(submitButton).toBeInTheDocument();
	});

	it("Link type button is rendered inside a React Router DOM link", () => {
		render(
			<Button buttonColor="yellow" buttonFontSize="text-base" buttonWidth="w-53" buttonPaddingY="py-2.5" buttonFuncionality={linkButtonFuncionality} />
			, {wrapper: BrowserRouter}
		);
		const linkButton = screen.getByRole("button", {name: "Link"});
		const linkRouterDom = screen.getByRole("link", {name: "Link"});

		expect(linkButton).toBeInTheDocument();
		expect(linkRouterDom).toBeInTheDocument();
		
	});
});

describe()