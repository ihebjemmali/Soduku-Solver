class Board extends EventEmitter {
  constructor(board) {
    super();

    this.board = board || [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  getRow(index) {
    return this.board[index];
  }

  updateBoard(newBoard) {
    this.board = newBoard;
  }

  getCol(index) {
    const result = [];
    for (let i = 0; i < this.board.length; i++) {
      result.push(this.board[i][index]);
    }
    return result;
  }

  generateBoard() {
    const hardPuzzle = [
      ["", "", 2, "", "", "", "", "", ""],
      ["", "", 9, "", "", "", "", "", ""],
      ["", 4, "", "", "", "", "", 6, ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", 5, 9, "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      [7, "", "", "", "", "", 4, "", 2],
      ["", 8, "", "", "", "", "", "", ""],
    ];

    this.board = hardPuzzle;
    this.emit("boardGenerated", hardPuzzle);
  }

  clearBoard() {
    const emptyPuzzle = [
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
    ];
    this.board = emptyPuzzle;
    this.emit("boardcleared", emptyPuzzle);
  }

  getBox(rowIndex, colIndex) {
    const result = [];
    const boxRowStart = rowIndex - (rowIndex % 3);
    const boxColStart = colIndex - (colIndex % 3);

    for (let r = boxRowStart; r < boxRowStart + 3; r++) {
      for (let d = boxColStart; d < boxColStart + 3; d++) {
        result.push(this.board[r][d]);
      }
    }
    return result;
  }

  getBoxByIndex(index) {
    const result = [];
    const startingRow = Math.floor(index / 3) * 3;
    const startingCol = Math.floor(index % 3) * 3;
    for (let r = startingRow; r < startingRow + 3; r++) {
      for (let d = startingCol; d < startingCol + 3; d++) {
        result.push(this.board[r][d]);
      }
    }
    return result;
  }
  /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */

  /*=========================================================================
=                 TODO: fill in these Checker Functions                    =
=========================================================================*/

  rowSafe(row, num) {
    //check if the row contains num
    const Row = this.getRow(row);
    if (Row.includes(num)) {
      return false;
    }
    return true;
  }

  colSafe(col, num) {
    //check if the col contains num
    const Col = this.getCol(col);
    if (Col.includes(num)) {
      return false;
    }
    return true;
  }

  boxSafe(row, col, num) {
    //check if the box contains num
    const box = this.getBox(row, col);
    if (box.includes(num)) {
      return false;
    }
    return true;
  }

  rowValidAt(rowIndex) {
    //check if a row is valid at a given index
    const row = this.getRow(rowIndex);
    for (let i = 0; i < row.length; i++) {
      const num1 = row[i];
      if (num1 !== "" && num1 !== 0) {
        for (let j = 0; j < row.length; j++) {
          const num2 = row[j];
          if (num1 === num2 && i !== j && num2 !== 0) {
            return false;
          }
        }
      }
    }
    return true;
  }

  colValidAt(colIndex) {
    //check if a column is valid at a given index
    const col = this.getCol(colIndex);
    for (let i = 0; i < col.length; i++) {
      const num1 = col[i];
      if (num1 !== "" && num1 !== 0) {
        for (let j = 0; j < col.length; j++) {
          const num2 = col[j];
          if (num1 === num2 && i !== j && num2 !== 0) {
            return false;
          }
        }
      }
    }
    return true;
  }

  boxValidAt(boxIndex) {
    //check if a box is valid at a given index
    const box = this.getBoxByIndex(boxIndex);
    for (let i = 0; i < box.length; i++) {
      const num1 = box[i];
      if (num1 !== "" && num1 !== 0) {
        for (let j = 0; j < box.length; j++) {
          const num2 = box[j];
          if (num1 === num2 && i !== j && num2 !== 0) {
            return false;
          }
        }
      }
    }
    return true;
  }

  allRowsValid() {
    //check if all the rows in the board are valid
    for (let i = 0; i < this.board.length; i++) {
      if (!this.rowValidAt(i)) {
        return false;
      }
    }
    return true;
  }
  allColsValid() {
    //check if all the columns in the board are valid
    for (let i = 0; i < this.board.length; i++) {
      if (!this.colValidAt(i)) {
        return false;
      }
    }
    return true;
  }
  allBoxesValid() {
    //check if all the boxes in the board are valid
    for (let i = 0; i < this.board.length; i++) {
      if (!this.boxValidAt(i)) {
        return false;
      }
    }
    return true;
  }

  validBoard() {
    return this.allBoxesValid() && this.allColsValid() && this.allRowsValid();
  }

  isSafe(row, col, num) {
    return (
      this.rowSafe(row, num) &&
      this.colSafe(col, num) &&
      this.boxSafe(row, col, num)
    );
  }

  /*=========================================================================
=                 TODO: fill in these Solver Functions                    =
=========================================================================*/

  solve() {
    //solve the board using a backtracking algorithm and return the solution
  }

  solveBoard() {
    while (this.validBoard()) {
      if (this.solve()) {
        this.emit("validBoard", this.board);
        return true;
      }
      return false;
    }
    this.emit("invalidBoard");
    // dont forget to add a small change here ;)
  }
}
