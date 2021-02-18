import React, { useState } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

import { convertStringToLocale, convertStringToNumber } from '../../utility/helper';
import Slider from '../common/Slider';

/* Styling */
import BodyStyle from './body.module.scss';

const FormInputRange = props => {
    const [inputState, setInputState] = useState(0);

    const updateControlValue = newVal => {
        setInputState(newVal);
        props.calculateSalary();
    }

    const handleInputChange = event => {
        updateControlValue(event.target.value);
    }

    return (
        <div className={BodyStyle.input_range_group}>
            <Form.Group controlId={props.controlId}>
                <Form.Label>{props.label}</Form.Label>
                <InputGroup className={"mb-3 " + BodyStyle.customInput_group}>
                    <InputGroup.Prepend>
                        <InputGroup.Text id={props.controlId + "_icon"} className="no-bg">
                            <i className="material-icons prefix">{props.iconName}</i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>

                    <FormControl
                        className={props.inputclassName}
                        disabled={props.isDisabled}
                        required={props.isRequired}
                        value={convertStringToLocale(inputState)}
                        onChange={handleInputChange}
                        aria-describedby={props.controlId + "_icon"}
                    />
                    <Form.Control.Feedback type="invalid">
                        {props.errorMessage}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            {/* Range */}
            {(props.rangeMax && props.rangeMax !== "") &&
                <Form.Group controlId={props.controlId + "Range"}>
                    <Slider
                        uniqueID={props.controlId + "Range"}
                        label={props.label}
                        labelClass="sr-only"
                        valueNow={inputState == "" ? 0 : parseInt(inputState)}
                        max={parseInt(props.rangeMax)}
                        updateControlValue={updateControlValue} />
                </Form.Group>
            }
        </div>
    );
};

export default FormInputRange;