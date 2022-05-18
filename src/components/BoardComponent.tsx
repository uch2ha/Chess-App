import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import CellComponent from "./CellComponents";

interface BoardProps {
   board: Board;
   setBoard: (board: Board) => void;
   currentPlayer: Player | null;
   swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
   board,
   setBoard,
   currentPlayer,
   swapPlayer,
}) => {
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
         swapPlayer();
         setSelectedCell(null);
         updateBoard();
      } else {
         if (cell.figure?.color === currentPlayer?.color) {
            setSelectedCell(cell);
         }
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
      <div>
         <h3>Current Player: {currentPlayer?.color}</h3>
         <div className="board">
            {board.cells.map((row, index) => (
               <React.Fragment key={index}>
                  {row.map((cell) => (
                     <CellComponent
                        handleCellClick={handleCellClick}
                        cell={cell}
                        key={cell.id}
                        selected={
                           cell.x === selectedCell?.x &&
                           cell.y === selectedCell?.y
                        }
                     />
                  ))}
               </React.Fragment>
            ))}
         </div>
      </div>
   );
};

export default BoardComponent;
