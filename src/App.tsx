import React, { useState, useEffect } from "react";
import { fetchData } from "./services/api";
import DataItemComp from "./components/DataItemComp";
import DataItemDetailsComp from "./components/DataItemDetailsComp";
import "./styles/App.css";
import { DataItemDetails } from "./types/DataItemType";

const App: React.FC = () => {
  const [data, setData] = useState<DataItemDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<DataItemDetails | null>(
    null
  );

  useEffect(() => {
    const fetchDataAndPopulate = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        setError("Error loading data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAndPopulate();
  }, []);

  const handleItemClick = (item: DataItemDetails) => {
    setSelectedData(item);
  };

  return (
    <div className="app">
      <h1>API Data App</h1>
      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {selectedData && (
        <div className="details">
          <h2>Details for {selectedData.name}</h2>
          {/* Display details of selectedData here */}
          <table>
            <thead>
              <tr>
                <th>Card Expiry</th>
                <th>Card Number</th>
                <th>Card Type</th>
                {/* Add other table headers as needed */}
              </tr>
            </thead>
            <tbody>
              <DataItemDetailsComp selectedItem={selectedData.bank} />
            </tbody>
          </table>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            {/* Add other table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <DataItemComp
              key={item.id}
              item={item}
              onItemClick={handleItemClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
