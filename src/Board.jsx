import { useState } from 'react';
import { Cell } from './Cell.jsx';

export function Board() {
    const board = Array(9).fill(null);
    let [last, setLast] = useState('❌');

    return (
        <>
        <div className='board'>
            {board.map((cell, index) => (
                <Cell 
                    last={last}
                    setLast={setLast}
                    cellNumber={index}
                    key={index}
                />
            ))}
        </div>
        <p className='turn'>Turno de: {last}</p>
        </>
    );
}