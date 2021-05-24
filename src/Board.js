import React, { useState } from "react";
import Cell from "./Cell";
import Won from './Won';
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = .25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    for (let i = 0; i < nrows; i++) {
      const cols = [];
      for (let j = 0; j < ncols; j++) {
        // const randNum = Math.random() * 100;
        // randNum <= chanceLightStartsOn ? cols.push(true) : cols.push(false);
        // from solution code
        cols.push(Math.random() < chanceLightStartsOn);
      }

      initialBoard.push(cols);
    }
    
    return initialBoard;
  }

  function hasWon() {
    for (let i = 0; i < nrows; i++) {
      for (let j = 0; j < ncols; j++) {
        if (board[i][j]) return false;
      }
    }

    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const deepCopy = board.map(arr => [...arr]);
      const adjacentCells = [[y,x], [y + 1, x], [y - 1, x], [y, x + 1], [y, x - 1]];
      adjacentCells.map(cell => flipCell(cell[0], cell[1], deepCopy));

      return deepCopy;
    });
  }

  if (hasWon(board)) return <Won />


  // make table board
  return (
    <table>
      <tbody>
        {board.map((row, y) => (
          <tr key={y}>
            {row.map((cell, x) => <Cell flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)} isLit={cell} key={`${y}-${x}`}/>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Board;