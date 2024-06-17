import { useState } from 'react';

const X = '❌';
const O = '⭕';

export function Board() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState(X);

    // Añade X o O en la celda y comprueba el resultado
    const setMove = (index) => {
        // Creamos una copia del estado actual del tablero. Siempre que se modifique el estado de un array o un objeto, se debe crear una copia para no modificar el estado original
        const newBoard = [...board];
        // Si la celda está vacía, añadimos el valor del jugador actual
        if (newBoard[index] === null) {
            newBoard[index] = player;
            // Actualizamos el estado del tablero
            setBoard(newBoard);
            setPlayer(player === X ? O : X);
        }

        checkWin(newBoard);
    }

    // Mira las tres posiciones de cada combinación ganadora y si son iguales, muestra un mensaje con el turno ganador. Si todas las celdas están ocupadas y no hay ganador, muestra un mensaje de empate
    const checkWin = (board) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
            [0, 4, 8], [2, 4, 6] // Diagonal
        ];

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                alert(`¡${player} gana!`);
                setBoard(Array(9).fill(null));
                setPlayer(X);
            }
        }

        if (board.every((cell) => cell)) {
            alert('¡Empate!');
            setBoard(Array(9).fill(null));
            setPlayer(X);
        }
    }

    return (
        <>
        <div className='board'>
            {board.map((cellValue, index) => (
                // Se pone () => setMove(index) para que se ejecute la función setMove cuando se haga click en la celda
                <div className="cell" key={index} onClick={() => setMove(index)}>{cellValue}</div>
            ))}
        </div>
        <p className='turn'>Turno de: {player}</p>
        </>
    );
}