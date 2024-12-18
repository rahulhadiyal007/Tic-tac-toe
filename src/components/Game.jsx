import React, { useState } from "react";
import './tst.css'; // Ensure you have your CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faRobot, faUser } from "@fortawesome/free-solid-svg-icons";

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(''));
    const [currentPlayer, setCurrentPlayer] = useState('X'); // Human player
    const [endMessage, setEndMessage] = useState(`X's turn`);
    const [humanScore, setHumanScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [winningCombination, setWinningCombination] = useState(null); // Track winning combination

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleSquareClick = (index) => {
        if (squares[index] !== '' || endMessage.includes('wins')) {
            return; // Square already filled or game over
        }

        const newSquares = squares.slice();
        newSquares[index] = currentPlayer;
        setSquares(newSquares);

        const winningCombo = checkWin(currentPlayer, newSquares);
        if (winningCombo) {
            setEndMessage(`Game over! ${currentPlayer} wins!`);
            setWinningCombination(winningCombo); // Set the winning combination
            setHumanScore(currentPlayer === 'X' ? humanScore + 1 : humanScore);
            return;
        }

        if (checkTie(newSquares)) {
            setEndMessage(`Game is tied!`);
            return;
        }

        // Switch to computer's turn
        setCurrentPlayer('O');
        setEndMessage(`Computer's turn!`);
        setTimeout(() => computerMove(newSquares), 500); // Delay for computer move
    };

    const computerMove = (newSquares) => {
        let availableSquares = newSquares.map((square, index) => square === '' ? index : null).filter(index => index !== null);
        if (availableSquares.length > 0) {
            const randomIndex = availableSquares[Math.floor(Math.random() * availableSquares.length)];
            newSquares[randomIndex] = 'O';

            setSquares(newSquares);

            const winningCombo = checkWin('O', newSquares);
            if (winningCombo) {
                setEndMessage(`Game over! Computer wins!`);
                setWinningCombination(winningCombo); // Set the winning combination
                setComputerScore(computerScore + 1);
                return;
            }

            if (checkTie(newSquares)) {
                setEndMessage(`Game is tied!`);
                return;
            }

            // Switch back to human's turn
            setCurrentPlayer('X');
            setEndMessage(`X's turn!`);
        }
    };

    const checkWin = (player, squares) => {
        return winningCombinations.find(combination => {
            const [a, b, c] = combination;
            return squares[a] === player && squares[b] === player && squares[c] === player;
        });
    };

    const checkTie = (squares) => {
        return squares.every(square => square !== '');
    };

    const restartGame = () => {
        setSquares(Array(9).fill(''));
        setCurrentPlayer('X');
        setEndMessage(`X's turn!`);
        setWinningCombination(null); // Reset winning combination
    };


      function refresh(){

             window.location.reload();
      }

    return (
        <div className="game-container">
           
            <div id="board">
                {squares.map((square, index) => (
                    <div
                        key={index}
                        className={`square ${winningCombination && winningCombination.includes(index) ? 'winning' : ''}`}
                        onClick={() => handleSquareClick(index)}
                    >
                        {square}
                    </div>
                ))}
               
            </div>
            <h2 className="message ">{endMessage}</h2>
            <h3 className="score">
                Score:  <FontAwesomeIcon icon={faUser} style={{color: "#555",}} /> You (X) - {humanScore} | <FontAwesomeIcon icon={faRobot} style={{color: "#555",}} /> Robot (O) - {computerScore}
            </h3>
            <button className="restart-button" onClick={restartGame}>
                Restart Game
            </button>
            <button className="refresh-button" onClick={refresh}>
                Refresh 
            <FontAwesomeIcon icon={faArrowsRotate} style={{color: "#ffffff",marginLeft:"10px"}} />
            </button>
        </div>
    );
}


export default Game;