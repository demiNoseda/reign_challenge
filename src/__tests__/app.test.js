import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";

test("Renders content", () => {
  render(<App />);

  expect(screen.getByTestId("header")).toBeInTheDocument();
});

describe("All section", () => {
  it("It opens the dropdown menu when you click it", async () => {
    render(<App invitationSerial={""} />);

    const topicDropdown = screen.getByTestId("topicDropdown");
    fireEvent.click(topicDropdown);

    expect(screen.getByTestId("dropdownMenu")).toBeInTheDocument();
  });
});
