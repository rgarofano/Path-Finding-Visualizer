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

    let nodeStatus = isSource ? 'source' : isTarget ? 'target' :
        isDiscovered ? 'discovered' : isWall ? 'wall' : isInShortestPath ? 'path' : '';

    return (
        <div
            className={`grid-item ${nodeStatus}`}
            onMouseDown={() => mouseDownHandler(row, col)}
            onMouseEnter={() => mouseEnterHandler(row, col)}
            onMouseUp={() => mouseUpHandler()}
        />
    );
}
