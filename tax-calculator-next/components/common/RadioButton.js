import React from 'react';
import { Form } from 'react-bootstrap';

const RadioButton = ({ style, label, name, value, currentValue, id, onChange, isDisabled }) => {
    return (
        <Form.Check
            className={style}
            type='radio'
            label={label}
            name={name}
            value={value}
            checked={currentValue === value}
            id={id}
            onChange={onChange}
            disabled={isDisabled}
        />
    );
};

export default RadioButton;