import confetti from 'canvas-confetti';
import { useState } from 'react';

import './App.css'
import { Square } from './components/Square';
import { TURNS } from './constants';
import { checkWinner } from './logic/board';
import { WinnerModal } from './components/WinnerModal';
import { resetGameStorage, saveGameToStorage } from './logic/storage';

function App() {
  // It's very important modifying states from set state functions, this way you won't see any difference between old information and new information to be rendered.
  // States should be initiated from component body, not inside any conditional structure as if blocks.
  const [board, setBoard] = useState(() => {
    const boardFromStorage = localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    saveGameToStorage({ board: newBoard, turn: newTurn });

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti()
      // State updates for React is ASYNCHRONOUS!
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  return (
    <main className='board'>
      <h1>Tic-tac-toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
