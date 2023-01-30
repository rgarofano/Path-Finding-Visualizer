import './Node.css';

export default function Node(props) {
    const {
        row,
        col,
        isSource,
        isTarget,
        isDiscovered,
        isWall,
        isInShortestPath,
        mouseDownHandler,
        mouseEnterHandler,
        mouseUpHandler,
    } = props;

    let nodeStatus = isTarget ? 'target' : isInShortestPath ? 'path' : isSource ? 'source' :
        isDiscovered ? 'discovered' : isWall ? 'wall' : '';

    return (
        <div
            className={`grid-item ${nodeStatus}`}
            onMouseDown={() => mouseDownHandler(row, col)}
            onMouseEnter={() => mouseEnterHandler(row, col)}
            onMouseUp={() => mouseUpHandler()}
        />
    );
}
