import "./Input.css";

function Input({ type, text, name, placeholder, onChange, value }) {

    return (
        <div className="form_control">
            <label htmlFor={name}>{text}:</label>
            <input
                required
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </div>
    );
}

export default Input;
