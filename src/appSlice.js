import { createSlice } from '@reduxjs/toolkit';

// Fungsi calculateWinner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Fungsi calculateNextValue
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    squares: Array(9).fill(null),
    nextValue: 'X',
    winner: null,
  },
  reducers: {
    selectSquare: (state, action) => {
      const { squares, winner, nextValue } = state;
      if (squares[action.payload] || winner) {
        return;
      }

      const newSquares = squares.slice();
      newSquares[action.payload] = nextValue;

      state.squares = newSquares;
      state.winner = calculateWinner(newSquares);
      state.nextValue = calculateNextValue(newSquares);
    },
    restart: (state) => {
      state.squares = Array(9).fill(null);
      state.nextValue = 'X';
      state.winner = null;
    },
  },
});

export const { selectSquare, restart } = appSlice.actions;
export const selectSquares = (state) => state.app.squares;
export const selectNextValue = (state) => state.app.nextValue;
export const selectWinner = (state) => state.app.winner;

export default appSlice.reducer;