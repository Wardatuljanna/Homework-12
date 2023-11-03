import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSquare, restart, selectSquares, selectNextValue, selectWinner } from './appSlice';
import './index.css';

function Board() {
  const squares = useSelector(selectSquares);
  const nextValue = useSelector(selectNextValue);
  const winner = useSelector(selectWinner);
  const dispatch = useDispatch();

  const renderSquare = (i) => (
    <button
      className="bg-blue-200 border border-gray-400 font-bold text-4xl w-16 h-16 flex items-center justify-center"
      onClick={() => dispatch(selectSquare(i))}
    >
      {squares[i]}
    </button>
  );

  return (
    <div>
      <div className="font-bold text-xl mb-2">
        STATUS: {calculateStatus(winner, squares, nextValue)}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-2">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-2">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-2">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="text-center">
        <button
          className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md mt-2 cursor-pointer mx-auto"
          onClick={() => dispatch(restart())}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md">
      <div className="text-2xl font-bold mb-4 text-center">Tic-Tac-Toe</div>
      <div>
        <Board />
      </div>
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Game />
    </div>
  );
}

export default App;
