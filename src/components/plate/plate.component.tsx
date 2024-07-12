import './plate.style.css';

const Plate = ({ name, state }: {
    name: string;
    state: number;
}) => {
    let stateClass = '';

    switch (state) {
        case 1:
            stateClass = 'state-1';
            break;
        case 2:
            stateClass = 'state-2';
            break;
        case 3:
            stateClass = 'state-3';
            break;
        default:
            stateClass = '';
            break;
    }

    return (
        <div className="plate-container">
            <span className="plate-name">{name}</span>
            <span className={`plate-state ${stateClass}`}>{state === 1 ? 'En cola' : state === 2 ? 'En preparación' : 'Realizado'}</span>
        </div>
    );
};

export default Plate;
