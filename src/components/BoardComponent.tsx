/* eslint-disable array-callback-return */
import React, { FC, useEffect, useState } from "react";
import { Board } from "../model/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../model/Cell";
import { Player } from "../model/Player";

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

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function click(cell: Cell) {
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
  }
  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);
  return (
    <div>
    <h3>Текущий игрок {currentPlayer?.color}</h3>
      <div className="board">
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                click={click}
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
    </div>
  );
};

export default BoardComponent;
