import { fireEvent, render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders properly form", () => {
    render(<Home />);

    const form = screen.getByTestId("calc-roman-id");
    expect(form).toBeInTheDocument();

    const integerLabel = screen.getByText(/Integer:/i);
    expect(integerLabel).toBeInTheDocument();

    const input = screen.getByLabelText(/Integer:/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "number");
    expect(input).toHaveAttribute("min", "1");
    expect(input).toHaveAttribute("max", "1000");

    const button = screen.getByRole("button", { name: "Calculate" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  it("button should be disabled if input value is less than 1 ", () => {
    render(<Home />);

    const input = screen.getByLabelText(/Integer:/i);

    const button = screen.getByRole("button", { name: "Calculate" });

    fireEvent.change(input, { target: { value: -2 } });
    expect(button).toHaveProperty("disabled", true);

    const note = screen.getByRole("p", {
      name: "Integer must be between 1 and 1000",
    });

    expect(note).toBeInTheDocument();
  });

  it("button should be disabled if input value is greater than 1000", () => {
    render(<Home />);

    const input = screen.getByLabelText(/Integer:/i);

    const button = screen.getByRole("button", { name: "Calculate" });

    fireEvent.change(input, { target: { value: 1003 } });
    expect(button).toHaveProperty("disabled", true);

    const note = screen.getByRole("p", {
      name: "Integer must be between 1 and 1000",
    });

    expect(note).toBeInTheDocument();
  });

  it("button should be enabled input value is between 1 and 1000", () => {
    render(<Home />);

    const input = screen.getByLabelText(/Integer:/i);

    const button = screen.getByRole("button", { name: "Calculate" });

    fireEvent.change(input, { target: { value: "432" } });

    expect(button).toHaveProperty("disabled", false);

    const note = screen.getByRole("p", {
      name: "Integer must be between 1 and 1000",
    });

    expect(note).not.toBeInTheDocument();
  });
});
