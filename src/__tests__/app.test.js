import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";
import { getHackerNews } from "../service/apiCalls";
import { wait } from "@testing-library/user-event/dist/utils";

jest.mock("../service/apiCalls", () => ({
  getHackerNews: jest.fn(),
}));

const mockedResponse = {
  nbPages: 1,
  hits: [
    {
      author: "WorldMaker",
      created_at: "2022-06-20T17:12:17.000Z",
      story_id: 31798311,
      story_title:
        "Bunny fonts – privacy respecting drop-in replacement for Google Fonts",
      story_url: "https://fonts.bunny.net/about",
    },
  ],
};

beforeEach(() => {
  getHackerNews.mockResolvedValue(Promise.resolve(mockedResponse));
});

describe("App test", () => {
  it("Renders content", () => {
    render(<App />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("Opens the dropdown menu when you click it", async () => {
    render(<App invitationSerial={""} />);

    const topicDropdown = screen.getByTestId("topicDropdown");
    fireEvent.click(topicDropdown);

    expect(screen.getByTestId("dropdownMenu")).toBeInTheDocument();
  });

  it("Search hacker news when a filter is selected", async () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};

    render(<App invitationSerial={""} />);

    const topicDropdown = screen.getByTestId("topicDropdown");
    fireEvent.click(topicDropdown);
    const reactjsFilter = screen.getByText("Reactjs");

    await wait(() => [
      fireEvent.click(reactjsFilter),
      expect(getHackerNews).toHaveBeenCalledTimes(1),
      expect(screen.getAllByTestId("post_card")).toBeInTheDocument(),
      expect(screen.getByText("WorldMaker")).toBeInTheDocument(),
    ]);
  });

  it("Changes the section when the toggler is clicked", async () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};

    render(<App invitationSerial={""} />);

    const favsSectionButton = screen.getByTestId("favs_section");
    fireEvent.click(favsSectionButton);
    expect(favsSectionButton).toHaveStyle(
      "border: 1px solid #1797ff; color: rgb(23, 151, 255);"
    );

    const allSectionButton = screen.getByTestId("all_section");
    fireEvent.click(allSectionButton);
    expect(allSectionButton).toHaveStyle(
      "border: 1px solid #1797ff; color: rgb(23, 151, 255);"
    );
  });
});
