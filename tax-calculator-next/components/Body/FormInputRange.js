import { React, useState } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import ReactNumeric from 'react-numeric';

import {convertStringToNumber} from '../../utility/helper';

const FormInputRange = props => {
    const [inputState, setInputState] = useState('');

    const handleInputChange = event => {
        if (!event.target.id.includes('Range') && event.target.id !== "formEmploymentIncome") {
            let inputVal = convertStringToNumber(event.target.value);
            
            document.getElementById(event.target.id + 'Range').value = inputVal;
        }
        setInputState(event.target.value);
    }

    return (
        <>
            <Form.Group controlId={props.controlId}>
                <Form.Label>{props.label}</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="hourly_rate" className="no-bg">
                            <i className="material-icons prefix">{props.iconName}</i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>

                    <ReactNumeric
                        className={props.inputClass}
                        id={props.controlId}
                        currencySymbol=""
                        minimumValue="0"
                        decimalCharacter="."
                        value={inputState}
                        onChange={handleInputChange}
                        inputMode="numeric"
                        outputMode="string"
                        decimalPlaces={0}
                        disabled={props.isDisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                        {props.errorMessage}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            {/* Range */}
            {(props.rangeMax && props.rangeMax !== "") &&
                <Form.Group controlId={props.controlId + "Range"}>
                    <Form.Label className="sr-only">{props.label}</Form.Label>
                    <Form.Control
                        type="range"
                        defaultValue="0"
                        //value={inputState == '' ? '0' : inputState}
                        disabled={props.isDisabled}
                        min="0" max={props.rangeMax}
                        onChange={handleInputChange} />
                </Form.Group>
            }
        </>
    );
};

export default FormInputRange;