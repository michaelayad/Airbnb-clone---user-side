import './inputNumer.css'
export default function NumberInput({ name, value, setValue }) {
    return (
        <div className="numberInputDiv">
            <label htmlFor={name}>{name}</label>
            <span>
                <button
                    disabled={value <= 0}
                    onClick={() => !(value <= 0) && setValue((val) => val - 1)}
                    className="button"
                >
                    -
                </button>
                <input
                    min={0}
                    max={20}
                    value={value}
                    id={name}
                    onChange={(e) => setValue(e.target.value)}
                    type="number"
                    placeholder="Add dates"
                />
                <button
                    onClick={() => !(value >= 20) && setValue((val) => val + 1)}
                    className="button"
                >
                    +
                </button>
            </span>
        </div>
    );
}