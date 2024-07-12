import './plate.style.css';

const Plate = ({ name, state, units }: {
    name: string;
    state: number;
    units: number; 
}) => {
    let stateClass = {
        state: '',
        text: ''
    };

    switch (state) {
        case 1:
            stateClass = {
                state: 'state-1',
                text: 'Pendiente'
            };
            break;
        case 2:
            stateClass = {
                state: 'state-1',
                text: 'A preparación'
            };
            break;
        case 3:
            stateClass = {
                state: 'state-1',
                text: 'En preparación'
            };
            break;
        default:
            break;
    }

    return (
        <div className="plate-container">
            <span className="plate-name">{units} - {name}</span>
            <span className={`plate-state ${stateClass.state}`}>{stateClass.text}</span>
        </div>
    );
};

export default Plate;
