import { useState } from 'react';
import './PathFindingVisualizer.css';
import Node from './Node/Node';
import dijkstra from '../../algorithms/dijkstra';

const NUM_ROWS = 25;
const NUM_COLS = 60;

let sourceRow = 10;
let sourceCol = 5;
let targetRow = 10;
let targetCol = 25;
let animationDelay = 10;
let colorWaveDelay = 1000;

export default function PathFindingVisualizer() {
    const nodes = createGrid();
    const [grid, setGrid] = useState(nodes);
    const [mouseDown, setMouseDown] = useState(false);
    const [disableReset, setDisableReset] = useState(true);
    const [disableDijkstra, setDisableDijkstra] = useState(false);

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
            }, animationDelay * nodeIndex);
        }

        const path = getShortestPathOrder(grid);
        const searchDelay = nodeVisitingOrder.length * animationDelay;
        for (let nodeIndex = 0; nodeIndex < path.length; nodeIndex++) {
            setTimeout(() => {
                const newGrid = grid.slice();
                const node = path[nodeIndex];
                const pathNode = {
                    ...node,
                    isInShortestPath: true,
                };
                newGrid[node.row][node.col] = pathNode;
                setGrid(newGrid);
            }, colorWaveDelay + searchDelay + nodeIndex * 20);
        }

        setTimeout(() => {
            setDisableReset(false);
            setDisableDijkstra(false);
        }, searchDelay + path.length * animationDelay);
    }

    const runDijkstra = () => {
        setDisableDijkstra(true);
        setDisableReset(true);
        const sourceNode = grid[sourceRow][sourceCol];
        const targetNode = grid[targetRow][targetCol];
        const nodeVisitingOrder = dijkstra(grid, sourceNode, targetNode);
        animateNodesInOrder(nodeVisitingOrder);
    }

    const mouseDownHandler = (row, col) => {
        if (!disableReset) return;
        const newGrid = getToggledGrid(grid, row, col);
        setGrid([...newGrid]);
        setMouseDown(true);
    }

    const mouseEnterHandler = (row, col) => {
        if (!mouseDown) {
            return;
        }
        const newGrid = getToggledGrid(grid, row, col);
        setGrid([...newGrid]);
    }

    const mouseUpHandler = () => setMouseDown(false);

    return (
        <>
            <button onClick={runDijkstra}
                disabled={disableDijkstra}>
                Visualize Dijkstra
            </button>
            <button onClick={() => {
                setDisableReset(true);
                setGrid(createGrid());
            }}
                disabled={disableReset}>
                Reset
            </button>
            <div className='grid-container'>
                {grid.map((row, rowIndex) => {
                    return <>
                        {row.map((node, colIndex) => {
                            const { isSource, isTarget, isDiscovered, isWall, isInShortestPath } = node;
                            return (
                                <Node
                                    key={`${rowIndex}${colIndex}`}
                                    row={rowIndex}
                                    col={colIndex}
                                    isSource={isSource}
                                    isTarget={isTarget}
                                    isDiscovered={isDiscovered}
                                    isWall={isWall}
                                    isInShortestPath={isInShortestPath}
                                    mouseDownHandler={mouseDownHandler}
                                    mouseEnterHandler={mouseEnterHandler}
                                    mouseUpHandler={mouseUpHandler}
                                />
                            )
                        })}
                    </>
                })}
            </div>
        </>
    )
}

function createGrid() {
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
        isInShortestPath: false,
        distance: Infinity,
        previousNode: null,
    };
}

function getToggledGrid(grid, row, col) {
    const nodeSelected = grid[row][col];
    const toggledNode = {
        ...nodeSelected,
        isWall: !nodeSelected.isWall,
    }
    grid[row][col] = toggledNode;
    return grid;
}

function getShortestPathOrder(grid) {
    const path = [];
    let currentNode = grid[targetRow][targetCol];
    while (currentNode.previousNode) {
        path.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    path.unshift(currentNode);
    console.log(path);
    return path;
}