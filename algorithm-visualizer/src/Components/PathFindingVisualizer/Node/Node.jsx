import './Node.css';

export default function Node({ isSource, isTarget, isDiscovered }) {
    let nodeStatus = isSource ? 'source' : isTarget ? 'target' :
        isDiscovered ? 'discovered' : '';
    return <div className={`grid-item ${nodeStatus}`} />;
}
