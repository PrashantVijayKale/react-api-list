import React from "react";
import DataItemComp from "./DataItemComp";
import { DataItemDetails } from "./../types/DataItemType";

interface DataTableProps {
  data: DataItemDetails[];
  onItemClick: (item: DataItemDetails) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onItemClick }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          {/* Add other table headers as needed */}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <DataItemComp
            key={item.id}
            item={item}
            onItemClick={onItemClick}
          />
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;