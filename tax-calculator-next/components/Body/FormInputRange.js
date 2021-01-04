import { React, useState } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

const FormInputRange = props => {
    const [inputState, setInputState] = useState("0");

    const handleInputChange = event => {
        setInputState(event.target.value);
    }

    return (
        <>
            <Form.Group controlId="formHourlYRate">
                <Form.Label>{props.label}</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="hourly_rate" className="no-bg">
                            <i className="material-icons prefix">monetization_on</i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        type="text"
                        value={inputState}
                        placeholder={props.label}
                        aria-label={props.label}
                        required
                        onChange={handleInputChange} />
                    <Form.Control.Feedback type="invalid">
                        {props.errorMessage}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            {/* Range */}
            <Form.Group controlId={props.controlId + "Range"}>
                <Form.Label className="sr-only">{props.label}</Form.Label>
                <Form.Control
                    type="range"
                    value={inputState}
                    min="0" max={props.rangeMax}
                    onChange={handleInputChange} />
            </Form.Group>
        </>
    );
};

export default FormInputRange;