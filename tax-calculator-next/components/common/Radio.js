import React, { useState } from 'react';

const Radio = props => {
    const [radioVal, setRadioVal] = useState("");

    const handleRadioBtnChange = event => {
        setRadioVal(event.target.value);
    }

    return (
        <p>
            <label>
                <input className="with-gap"
                    name="province"
                    type="radio"
                    value={props.value}
                    onChange={handleRadioBtnChange} />
                <span>{props.displayText}</span>
            </label>
        </p>
    );
};

export default Radio;
