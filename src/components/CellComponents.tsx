import React, { FC } from "react";
import { Cell } from "../models/Cell";

interface CellProps {
   cell: Cell;
   selected: boolean;
   handleCellClick: (cell: Cell) => void;
}

const CellComponents: FC<CellProps> = ({ cell, selected, handleCellClick }) => {
   return (
      <div
         className={["cell", cell.color, selected ? "selected" : ""].join(" ")}
         onClick={() => handleCellClick(cell)}
         style={{
            backgroundColor: cell.available && cell.figure ? "green" : "",
         }}
      >
         {cell.available && !cell.figure && <div className={"available"} />}
         {cell.figure?.logo && <img src={cell.figure.logo} />}
      </div>
   );
};

export default CellComponents;
