// App.tsx
import React, { useState, useEffect } from "react";
import DataFetcher from "./DataFetcher";
import DataTable from "./components/DataTable";
import DataItemDetailsComp from "./components/DataItemDetailsComp";
import "./styles/App.css";
import { DataItemDetails } from "./types/DataItemType";

const App: React.FC = () => {
  const [data, setData] = useState<DataItemDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<DataItemDetails | null>(
    null
  );

  const handleItemClick = (item: DataItemDetails) => {
    setSelectedData(item);
  };

  return (
    <div className="app">
      <h1>API Data App</h1>
      {error && <div className="error">{error}</div>}
      <DataFetcher onDataLoaded={setData} onError={setError} />
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
      <DataTable data={data} onItemClick={handleItemClick} />
    </div>
  );
};

export default App;