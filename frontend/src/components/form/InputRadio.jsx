import React from 'react';

function InputRadio({ type, text, name, handleOnChange, value }) {
    return (
        <div className="radioDisplay">
            <input
                className="radioInput"
                type={type}
                name={name}
                id={value} 
                onChange={handleOnChange}  
                value={value}
            />
            <label htmlFor={value} className="radioLabel">
                <span className="styledRadio">{text}</span>
            </label>
        </div>
    );
}

export default InputRadio;
