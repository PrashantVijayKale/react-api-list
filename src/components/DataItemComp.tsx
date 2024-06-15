import React from "react";
import { DataItemDetails } from "./../types/DataItemType";

interface DataItemProps {
  item: DataItemDetails;
  onItemClick: (item: DataItemDetails) => void;
}

const DataItemComp: React.FC<DataItemProps> = ({ item, onItemClick }) => {
  return (
    <tr onClick={() => onItemClick(item)}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      {/* Add other table cells as needed */}
    </tr>
  );
};

export default DataItemComp;
