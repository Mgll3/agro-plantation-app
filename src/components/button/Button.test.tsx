import { render, screen } from "@testing-library/react";
import Button from "./Button";
import { BrowserRouter } from "react-router-dom";
import user from "@testing-library/user-event";
import { cleanup } from "@testing-library/react";

user.setup();

const handleClickMock = vi.fn();

const actionButtonFuncionality = {
	actionText: "Action",
	handleClick: handleClickMock
};

const submitButtonFuncionality = {
	submitText: "Submit"
};

const linkButtonFuncionality = {
	linkText: "Link",
	linkUrl: "/login"
};

afterEach(() => cleanup());

//TESTS

describe("Action type button:", () => {
	beforeEach(() => {
		handleClickMock.mockClear();
		render(
			<Button
				buttonColor="yellow"
				buttonFontSize="text-base"
				buttonWidth="w-53"
				buttonPaddingY="py-2.5"
				buttonFuncionality={actionButtonFuncionality}
			/>
		);
	});

	it("Renders correctly", () => {
		const actionButton = screen.getByRole("button", { name: "Action" });
		expect(actionButton).toBeInTheDocument();
	});

	it("Calls it´s handleClick function when clicked", async () => {
		const actionButton = screen.getByRole("button", { name: "Action" });

		await user.click(actionButton);

		expect(handleClickMock).toHaveBeenCalledTimes(1);
	});

	it("Calls it´s handleClick function two times when clicked two times", async () => {
		const actionButton = screen.getByRole("button", { name: "Action" });

		await user.click(actionButton);
		await user.click(actionButton);

		expect(handleClickMock).toHaveBeenCalledTimes(2);
	});
});

describe("Submit button:", () => {
	beforeEach(() => {
		render(
			<Button
				buttonColor="yellow"
				buttonFontSize="text-base"
				buttonWidth="w-53"
				buttonPaddingY="py-2.5"
				buttonFuncionality={submitButtonFuncionality}
			/>
		);
	});

	it("Renders correctly", () => {
		const submitButton = screen.getByRole("button", { name: "Submit" });
		expect(submitButton).toBeInTheDocument();
	});

	it("Has the attribute 'type=submit '", async () => {
		const submitButton = screen.getByRole("button", { name: "Submit" });

		expect(submitButton).toHaveAttribute("type", "submit");
	});
});

describe("Link type button:", () => {
	beforeEach(() => {
		render(
			<Button
				buttonColor="yellow"
				buttonFontSize="text-base"
				buttonWidth="w-53"
				buttonPaddingY="py-2.5"
				buttonFuncionality={linkButtonFuncionality}
			/>,
			{ wrapper: BrowserRouter }
		);
	});

	it("Renders correctly", () => {
		const linkButton = screen.getByRole("button", { name: "Link" });
		const linkRouterDom = screen.getByRole("link", { name: "Link" });

		expect(linkButton).toBeInTheDocument();
		expect(linkRouterDom).toBeInTheDocument();
	});

	it("Has the attribute 'href=/login' ", () => {
		const linkRouterDom = screen.getByRole("link", { name: "Link" });

		expect(linkRouterDom).toHaveAttribute("href", "/login");
	});
});
