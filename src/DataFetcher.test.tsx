import { render, screen, fireEvent, act } from '@testing-library/react';
import DataFetcher from './DataFetcher';
import { fetchData } from './services/api';
import { DataItemDetails } from './types/DataItemType';

// Mock fetchData function
jest.mock('./services/api', () => ({
  fetchData: jest.fn(() => Promise.resolve([
    { id: 1, name: 'Item 1', bank: { cardExpire: '12/24', cardNumber: '1234567890123456', cardType: 'Visa' } },
    { id: 2, name: 'Item 2', bank: { cardExpire: '01/25', cardNumber: '9876543210987654', cardType: 'Mastercard' } },
  ])),
}));

describe('DataFetcher', () => {

    beforeEach(() => {
        (fetchData as jest.Mock).mockResolvedValue([
            { id: 1, name: 'Item 1', bank: { cardExpire: '12/24', cardNumber: '1234567890123456', cardType: 'Visa' } },
            { id: 2, name: 'Item 2', bank: { cardExpire: '01/25', cardNumber: '9876543210987654', cardType: 'Mastercard' } },
          ]);
      });
    
      afterEach(() => {
        (fetchData as jest.Mock).mockClear();
      });

  it('calls onDataLoaded with fetched data', async () => {
    const onDataLoaded = jest.fn();
    const onError = jest.fn();
    render(<DataFetcher onDataLoaded={onDataLoaded} onError={onError} />);

    // Check if the loading message is rendered initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await act(async () => {
        await fetchData();// Wait for data to load
    });

    // Now check if the loading message is no longer rendered
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    expect(onDataLoaded).toHaveBeenCalledWith([
      { id: 1, name: 'Item 1', bank: { cardExpire: '12/24', cardNumber: '1234567890123456', cardType: 'Visa' } },
      { id: 2, name: 'Item 2', bank: { cardExpire: '01/25', cardNumber: '9876543210987654', cardType: 'Mastercard' } },
    ]);
  });

  it('calls onError if fetchData throws an error', async () => {
    const onDataLoaded = jest.fn();
    const onError = jest.fn();
    (fetchData as jest.Mock).mockRejectedValueOnce(
        new Error("Error loading data")
      );
    render(<DataFetcher onDataLoaded={onDataLoaded} onError={onError} />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for error to occur
    });
    expect(onError).toHaveBeenCalledWith('Error loading data. Please try again later.');
  });
});
