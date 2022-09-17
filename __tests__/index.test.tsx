import { fireEvent, render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  const buttonName = "Calculate";
  const formLabel = /Integer:/i;
  const noteText = "Integer must be between 1 and 1000";

  it("renders properly form", () => {
    render(<Home />);

    const form = screen.getByTestId("calc-roman");
    expect(form).toBeInTheDocument();

    const integerLabel = screen.getByText(formLabel);
    expect(integerLabel).toBeInTheDocument();

    const input = screen.getByLabelText(formLabel);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "number");
    expect(input).toHaveAttribute("min", "1");
    expect(input).toHaveAttribute("max", "1000");

    const button = screen.getByRole("button", { name: buttonName });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  it("button should be disabled if input value is less than 1", () => {
    render(<Home />);

    const input = screen.getByLabelText(formLabel);

    const button = screen.getByRole("button", { name: buttonName });

    fireEvent.change(input, { target: { value: -2 } });
    expect(button).toHaveProperty("disabled", true);

    const note = screen.queryByText(noteText);

    expect(note).toBeInTheDocument();
  });

  it("button is disabled if input value is greater than 1000", () => {
    render(<Home />);

    const input = screen.getByLabelText(formLabel);

    const button = screen.getByRole("button", { name: buttonName });

    fireEvent.change(input, { target: { value: 1003 } });
    expect(button).toHaveProperty("disabled", true);

    const note = screen.queryByText(noteText);

    expect(note).toBeInTheDocument();
  });

  it("button is enabled if input value is in range [1, 1000]", () => {
    render(<Home />);

    const input = screen.getByLabelText(formLabel);

    const button = screen.getByRole("button", { name: buttonName });

    fireEvent.change(input, { target: { value: "432" } });

    expect(button).toHaveProperty("disabled", false);

    const note = screen.queryByText(noteText);

    expect(note).not.toBeInTheDocument();
  });

  it("renders result", () => {
    render(<Home />);

    const result = screen.queryByText(/result/i);
    expect(result).toBeInTheDocument();
  });
});
