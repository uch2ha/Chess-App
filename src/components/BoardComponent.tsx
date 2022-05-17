import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import CellComponent from "./CellComponents";

interface BoardProps {
   board: Board;
   setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
   const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

   useEffect(() => {
      highlightCells();
   }, [selectedCell]);

   const handleCellClick = (cell: Cell) => {
      if (
         selectedCell &&
         selectedCell !== cell &&
         selectedCell.figure?.canMove(cell)
      ) {
         selectedCell.moveFigure(cell);
         setSelectedCell(null);
      } else {
         setSelectedCell(cell);
      }
   };

   const highlightCells = () => {
      board.highlightCells(selectedCell);
      updateBoard();
   };

   const updateBoard = () => {
      const newBoard = board.getBoardCopy();
      setBoard(newBoard);
   };

   return (
      <div className="board">
         {board.cells.map((row, index) => (
            <React.Fragment key={index}>
               {row.map((cell) => (
                  <CellComponent
                     handleCellClick={handleCellClick}
                     cell={cell}
                     key={cell.id}
                     selected={
                        cell.x === selectedCell?.x && cell.y === selectedCell?.y
                     }
                  />
               ))}
            </React.Fragment>
         ))}
      </div>
   );
};

export default BoardComponent;
