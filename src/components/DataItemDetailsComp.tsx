import React from "react";
import { DataItemBankDetails } from "./../types/DataItemType";

interface DataItemDetailsProps {
  selectedItem: DataItemBankDetails;
}

const DataItemDetailsComp: React.FC<DataItemDetailsProps> = ({
  selectedItem,
}) => {
  return (
    <tr>
      <td>{selectedItem.cardExpire}</td>
      <td>{selectedItem.cardNumber}</td>
      <td>{selectedItem.cardType}</td>
      {/* Add other table cells as needed */}
    </tr>
  );
};

export default DataItemDetailsComp;
