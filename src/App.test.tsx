import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import DataFetcher from "./DataFetcher";
import DataTable from "./components/DataTable";
import DataItemDetailsComp from "./components/DataItemDetailsComp";
import { DataItemDetails } from "./types/DataItemType";
import { fetchData } from "./services/api";

// Mock fetchData function
jest.mock("./services/api", () => ({
  fetchData: jest.fn(() =>
    Promise.resolve([
      {
        id: 1,
        name: "Item 1",
        bank: {
          cardExpire: "12/24",
          cardNumber: "1234567890123456",
          cardType: "Visa",
        },
      },
      {
        id: 2,
        name: "Item 2",
        bank: {
          cardExpire: "01/25",
          cardNumber: "9876543210987654",
          cardType: "Mastercard",
        },
      },
    ])
  ),
}));

describe("App", () => {
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

// describe.skip("DataFetcher", () => {
//   it("calls onDataLoaded with fetched data", async () => {
//     const onDataLoaded = jest.fn();
//     const onError = jest.fn();
//     render(<DataFetcher onDataLoaded={onDataLoaded} onError={onError} />);
//     await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for data to load
//     expect(onDataLoaded).toHaveBeenCalledWith([
//       {
//         id: 1,
//         name: "Item 1",
//         bank: {
//           cardExpire: "12/24",
//           cardNumber: "1234567890123456",
//           cardType: "Visa",
//         },
//       },
//       {
//         id: 2,
//         name: "Item 2",
//         bank: {
//           cardExpire: "01/25",
//           cardNumber: "9876543210987654",
//           cardType: "Mastercard",
//         },
//       },
//     ]);
//   });

//   it("calls onError if fetchData throws an error", async () => {
//     jest.mock("./services/api", () => ({
//       fetchData: jest.fn(() => Promise.reject("Error fetching data")),
//     }));

//     const onDataLoaded = jest.fn();
//     const onError = jest.fn();
//     render(<DataFetcher onDataLoaded={onDataLoaded} onError={onError} />);
//     await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for error to occur
//     expect(onError).toHaveBeenCalledWith(
//       "Error loading data. Please try again later."
//     );
//   });
// });

// describe.skip("DataTable", () => {
//   it("renders a table with data", () => {
//     const data: DataItemDetails[] = [
//       {
//         id: 1,
//         name: "Item 1",
//         bank: {
//           cardExpire: "12/24",
//           cardNumber: "1234567890123456",
//           cardType: "Visa",
//         },
//       },
//       {
//         id: 2,
//         name: "Item 2",
//         bank: {
//           cardExpire: "01/25",
//           cardNumber: "9876543210987654",
//           cardType: "Mastercard",
//         },
//       },
//     ];
//     const onItemClick = jest.fn();
//     render(<DataTable data={data} onItemClick={onItemClick} />);
//     expect(screen.getByRole("table")).toBeInTheDocument();
//     expect(screen.getByText("Item 1")).toBeInTheDocument();
//     expect(screen.getByText("Item 2")).toBeInTheDocument();
//   });

//   it("calls onItemClick when a data item is clicked", () => {
//     const data: DataItemDetails[] = [
//       {
//         id: 1,
//         name: "Item 1",
//         bank: {
//           cardExpire: "12/24",
//           cardNumber: "1234567890123456",
//           cardType: "Visa",
//         },
//       },
//       {
//         id: 2,
//         name: "Item 2",
//         bank: {
//           cardExpire: "01/25",
//           cardNumber: "9876543210987654",
//           cardType: "Mastercard",
//         },
//       },
//     ];
//     const onItemClick = jest.fn();
//     render(<DataTable data={data} onItemClick={onItemClick} />);
//     const dataItem = screen.getByText("Item 1");
//     fireEvent.click(dataItem);
//     expect(onItemClick).toHaveBeenCalledWith({
//       id: 1,
//       name: "Item 1",
//       bank: {
//         cardExpire: "12/24",
//         cardNumber: "1234567890123456",
//         cardType: "Visa",
//       },
//     });
//   });
// });

// describe.skip("DataItemDetailsComp", () => {
//   it("renders details of the selected item", () => {
//     const selectedItem = {
//       cardExpire: "12/24",
//       cardNumber: "1234567890123456",
//       cardType: "Visa",
//     };
//     render(<DataItemDetailsComp selectedItem={selectedItem} />);
//     expect(screen.getByText("12/24")).toBeInTheDocument();
//     expect(screen.getByText("1234567890123456")).toBeInTheDocument();
//     expect(screen.getByText("Visa")).toBeInTheDocument();
//   });
// });
