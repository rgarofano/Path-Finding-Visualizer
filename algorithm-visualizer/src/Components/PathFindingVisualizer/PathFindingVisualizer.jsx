import { useState } from 'react';
import './PathFindingVisualizer.css';
import Node from './Node/Node';
import dijkstra from '../../algorithms/dijkstra';

const NUM_ROWS = 25;
const NUM_COLS = 50;

let sourceRow = 10;
let sourceCol = 5;
let targetRow = 10;
let targetCol = 25;

export default function PathFindingVisualizer() {
    const nodes = useGrid();
    const [grid, setGrid] = useState(nodes);

    const animateNodesInOrder = nodeVisitingOrder => {
        for (let nodeIndex = 0; nodeIndex < nodeVisitingOrder.length; nodeIndex++) {
            setTimeout(() => {
                const newGrid = grid.slice();
                const node = nodeVisitingOrder[nodeIndex];
                const discoveredNode = {
                    ...node,
                    isDiscovered: true,
                };
                newGrid[node.row][node.col] = discoveredNode;
                setGrid(newGrid);
            }, 15 * nodeIndex);
        }
    }

    const runDijkstra = () => {
        const sourceNode = grid[sourceRow][sourceCol];
        const targetNode = grid[targetRow][targetCol];
        const nodeVisitingOrder = dijkstra(grid, sourceNode, targetNode);
        animateNodesInOrder(nodeVisitingOrder);
    }

    return (
        <>
            <button onClick={() => runDijkstra()}>Visualize Dijkstra</button>
            <div className='grid-container'>
                {grid.map((row, rowIndex) => {
                    return <>
                        {row.map((node, colIndex) => {
                            const { isSource, isTarget, isDiscovered, isWall } = node;
                            return (
                                <Node
                                    key={`${rowIndex}${colIndex}`}
                                    isSource={isSource}
                                    isTarget={isTarget}
                                    isDiscovered={isDiscovered}
                                    isWall={isWall}
                                />
                            )
                        })}
                    </>
                })}
            </div>
        </>
    )
}

function useGrid() {
    const gridObjectsArray = [];
    for (let row = 0; row < NUM_ROWS; row++) {
        const currentRow = [];
        for (let col = 0; col < NUM_COLS; col++) {
            const node = createGraphNode(row, col);
            currentRow.push(node);
        }
        gridObjectsArray.push(currentRow);
    }
    return gridObjectsArray;
}

function createGraphNode(row, col) {
    return {
        row,
        col,
        isSource: row === sourceRow && col === sourceCol,
        isTarget: row === targetRow && col === targetCol,
        isDiscovered: false,
        isWall: false,
        distance: Infinity,
        previousNode: null,
    };
}