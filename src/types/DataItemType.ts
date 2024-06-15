// Define the interface for your data items bank details
export interface DataItemBankDetails {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  // Add other properties as needed
}

// Define the interface for your data items
export interface DataItemDetails {
  bank: DataItemBankDetails;
  id: number;
  name: string;
  // Add other properties as needed
}
