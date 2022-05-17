import React, { FC } from "react";
import { Cell } from "../models/Cell";

interface CellProps {
   cell: Cell;
}

const CellComponents: FC<CellProps> = ({ cell }) => {
   return <div className={["cell", cell.color].join(" ")}></div>;
};

export default CellComponents;
