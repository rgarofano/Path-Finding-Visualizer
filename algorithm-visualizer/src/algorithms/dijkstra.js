export default function dijkstra(grid, sourceNode, targetNode) {
    sourceNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    const nodeVisitingOrder = [];
    while (unvisitedNodes.length > 0) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if (closestNode.isWall) continue;
        if (closestNode === targetNode) {
            console.log(nodeVisitingOrder);
            setNodesAsUnvisited(nodeVisitingOrder);
            return nodeVisitingOrder;
        }
        closestNode.isDiscovered = true;
        nodeVisitingOrder.push(closestNode);
        updateNeighbours(grid, closestNode);
    }
}

function getAllNodes(grid) {
    const nodes = [];
    for (let row of grid) {
        for (let node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function sortNodesByDistance(nodes) {
    nodes.sort((a, b) => {
        return a.distance < b.distance ? -1 : 1;
    });
}

function isOutOfBounds(grid, row, col) {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        return true;
    } else if (grid[row][col].isDiscovered) {
        return true;
    }
    return false;
}

function updateNeighbours(grid, node) {
    if (!isOutOfBounds(grid, node.row + 1, node.col)) {
        const currentNode = grid[node.row + 1][node.col];
        currentNode.distance = node.distance + 1;
        currentNode.previousNode = node;
    }

    if (!isOutOfBounds(grid, node.row - 1, node.col)) {
        const currentNode = grid[node.row - 1][node.col];
        currentNode.distance = node.distance + 1;
        currentNode.previousNode = node;
    }

    if (!isOutOfBounds(grid, node.row, node.col + 1)) {
        const currentNode = grid[node.row][node.col + 1];
        currentNode.distance = node.distance + 1;
        currentNode.previousNode = node;
    }

    if (!isOutOfBounds(grid, node.row, node.col - 1)) {
        const currentNode = grid[node.row][node.col - 1];
        currentNode.distance = node.distance + 1;
        currentNode.previousNode = node;
    }
}

function setNodesAsUnvisited(order) {
    for (let node of order) {
        node.isDiscovered = false;
    }
}