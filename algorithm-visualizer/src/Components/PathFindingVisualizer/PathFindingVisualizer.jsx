import { useEffect, useState } from 'react';
import './PathFindingVisualizer.css';
import Node from './Node/Node';

const NUM_ROWS = 25;
const NUM_COLS = 50;
let sourceRow = 10;
let sourceCol = 5;
let targetRow = 10;
let targetCol = 45;

export default function PathFindingVisualizer() {
    const nodes = useGrid();
    const [grid, setGrid] = useState(nodes);

    return (
        <div className='grid-container'>
            {grid.map((row, rowIndex) => {
                return <>
                    {row.map((node, colIndex) => {
                        const { isSource, isTarget, isDiscovered } = node;
                        return (
                            <Node
                                key={`${rowIndex}${colIndex}`}
                                isSource={isSource}
                                isTarget={isTarget}
                                isDiscovered={isDiscovered}
                            />
                        )
                    })}
                </>
            })}
        </div>
    )
}

function useGrid() {
    const [emptyGrid, setEmptyGrid] = useState([]);

    useEffect(() => {
        const gridObjectsArray = [];
        for (let row = 0; row < NUM_ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < NUM_COLS; col++) {
                const node = {
                    isSource: row === sourceRow && col === sourceCol,
                    isTarget: row === targetRow && col === targetCol,
                    isDiscovered: false,
                }
                currentRow.push(node);
            }
            gridObjectsArray.push(currentRow);
        }

        setEmptyGrid(gridObjectsArray);
    }, []);

    return emptyGrid;
}