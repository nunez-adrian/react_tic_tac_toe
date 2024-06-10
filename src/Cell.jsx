import { useState } from 'react';

// Todas las combinaciones posibles para ganar
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const X = '❌'
const O = '⭕'

export function Cell({last, setLast, cellNumber}) {

    const [cellValue, setCellValue] = useState(null)
    const [combinations, setCombinations] = useState(winningCombinations)

    // Comprueba los 3 elementos de cada posicion. Si alguna combinacion tiene los tres valores iguales (every()), se muestra un alert con el ganador. Si todos los elementos de todas las posiciones son strings, entonces empate
    const checkWin = () => {
        for (let i = 0; i < combinations.length; i++) {
            if (combinations[i].every( (val, i, arr) => val === arr[0] )) {
                alert(`${last} wins!`)
                return window.location.reload()
            }
        }

        if (combinations.every((combination) => combination.every((val) => typeof val === 'string'))) {
            alert('Draw!')
            return window.location.reload()
        }
    }

    // Añade X o O en la celda y comprueba el resultado
    const setMove = () => {
        if (cellValue === null) {
            setCellValue(last)
            setLast(last === X ? O : X)
        }

        for (let i = 0; i < winningCombinations.length; i++) {
            for(let j = 0; j < winningCombinations[i].length; j++) {
                if (winningCombinations[i][j] === cellNumber) {
                    winningCombinations[i][j] = last

                    setCombinations(winningCombinations)
                }
            }
        }

        checkWin()
    }

    return (
        <div className="cell" cell-number={cellNumber} onClick={setMove}>{cellValue}</div>
    )
}