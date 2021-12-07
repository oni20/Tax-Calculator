import React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { convertStringToLocale } from '../../utility/helper';
import { useInputSliderSharedState } from '../SharedState/InputSliderSharedState';

const InputBox = (props) => {
    const {
        controlId,
        label,
        inputGroupClassName,
        iconName,
        inputclassName,
        isDisabled,
        isRequired,
        errorMessage,
    } = props;

    const { inputState, setInputState } = useInputSliderSharedState();

    return (
        <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <InputGroup className={`mb-3 ${inputGroupClassName}`}>
                <InputGroup.Prepend>
                    <InputGroup.Text id={`${controlId}_icon`} className='no-bg'>
                        <i className='material-icons prefix'>{iconName}</i>
                    </InputGroup.Text>
                </InputGroup.Prepend>

                <FormControl
                    className={inputclassName}
                    disabled={isDisabled}
                    required={isRequired}
                    value={inputState[controlId]}
                    onChange={(event) => {
                        setInputState({
                            ...inputState,
                            [controlId]: convertStringToLocale(event.target.value)
                        })
                    }}
                    aria-describedby={controlId + '_icon'}
                />
                <Form.Control.Feedback type='invalid'>
                    {errorMessage}
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    );
};

export default InputBox;