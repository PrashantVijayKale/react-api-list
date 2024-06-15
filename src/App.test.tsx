import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { DataItemDetails } from "./types/DataItemType";
import { fetchData } from "./services/api"; 

// Mock fetchData to return sample data
jest.mock("./services/api", () => ({
  fetchData: jest.fn(() => Promise.resolve()),
}));

describe("App Component", () => {
  beforeEach(() => {
    (fetchData as jest.Mock).mockResolvedValue([
      {
        id: 2,
        name: "Michael",
        bank: {
          cardExpire: "12/24",
          cardNumber: "1234567890123456",
          cardType: "Visa",
        },
      },
      {
        id: 3,
        name: "Sophia",
        bank: {
          cardExpire: "01/25",
          cardNumber: "9876543210123456",
          cardType: "MasterCard",
        },
      },
    ]);
  });

  afterEach(() => {
    (fetchData as jest.Mock).mockClear();
  });

  it("renders the app title", () => {
    render(<App />);
    expect(screen.getByText("API Data App")).toBeInTheDocument();
  });

  it("renders loading state while fetching data", () => {
    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders data items in a table", async () => {
    render(<App />);
    // Call fetchData to trigger the data fetching logic
    await fetchData();
    // Wait for the data to be rendered
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(await screen.findByText("Michael")).toBeInTheDocument();
    expect(await screen.findByText("Sophia")).toBeInTheDocument();
  });

  it("renders details of selected data item", async () => {
    render(<App />);
    await fetchData(); // Call fetchData to trigger data fetching
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for data to load
    const michaelRow = await screen.findByText("Michael"); // Use findByText to wait for the element
    fireEvent.click(michaelRow);
    // Wait for the details section to appear
    await screen.findByText("Details for Michael");
    expect(screen.getByText("12/24")).toBeInTheDocument();
    expect(screen.getByText("1234567890123456")).toBeInTheDocument();
    expect(screen.getByText("Visa")).toBeInTheDocument();
  });

  it("handles error state", async () => {
    // Mock fetchData to throw an error
    (fetchData as jest.Mock).mockRejectedValueOnce(
      new Error("Error loading data")
    );
    render(<App />);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for data to load
    expect(
      screen.getByText("Error loading data. Please try again later.")
    ).toBeInTheDocument();
  });
});
