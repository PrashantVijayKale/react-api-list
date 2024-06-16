import React, { useState, useEffect } from "react";
import { fetchData } from "./services/api";
import { DataItemDetails } from "./types/DataItemType";

interface DataFetcherProps {
  onDataLoaded: (data: DataItemDetails[]) => void;
  onError: (error: string) => void;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ onDataLoaded, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DataItemDetails[]>([]); // Add state for data

  useEffect(() => {
    const fetchDataAndPopulate = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await fetchData();
        setData(fetchedData); // Update the data state
        onDataLoaded(fetchedData); // Call onDataLoaded
      } catch (error) {
        onError("Error loading data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAndPopulate();
  }, []);

  return (
    <div>
      {isLoading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default DataFetcher;
