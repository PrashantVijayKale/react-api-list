import axios from "axios";

// Define the interface for your data items bank details
interface DataItemBankDetails {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  // Add other properties as needed
}

// Define the interface for your data items
interface DataItemDetails {
  bank: DataItemBankDetails;
  id: number;
  name: string;
  // Add other properties as needed
}

// Define the base URL for your dummy API
const apiUrl = "https://dummyjson.com/users"; // Replace with your actual API URL

// Function to fetch data from the dummy API
export const fetchData = async (): Promise<DataItemDetails[]> => {
  try {
    const response = await axios.get(apiUrl);
    // Extract the data from the response
    const data: DataItemDetails[] = response.data.users.map((user: any) => ({
      id: user.id,
      name: user.firstName, // Assuming the API returns 'firstName',
      bank: user.bank,
    }));
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
