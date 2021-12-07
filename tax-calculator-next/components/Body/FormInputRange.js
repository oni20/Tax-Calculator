import React from 'react';
import { Form } from 'react-bootstrap';

import Slider from '../common/Slider';
import InputBox from '../common/InputBox';

/* Styling */
import BodyStyle from './body.module.scss';

const FormInputRange = props => {
    const {
        controlId,
        label,
        iconName,
        inputclassName,
        isDisabled,
        isRequired,
        errorMessage,
        rangeMax,
    } = props;

    return (
        <div className={BodyStyle.input_range_group}>
            <InputBox
                controlId={controlId}
                label={label}
                inputGroupClassName={BodyStyle.customInput_group}
                iconName={iconName}
                inputclassName={inputclassName}
                isDisabled={isDisabled}
                isRequired={isRequired}
                errorMessage={errorMessage}
            />

            {/* Range */}
            {(rangeMax && rangeMax !== '') &&
                <Form.Group controlId={controlId + 'Range'}>
                    <Slider
                        controlId={controlId}
                        label={label}
                        labelClass='sr-only'
                        max={parseInt(rangeMax)}
                    />
                </Form.Group>
            }
        </div>
    );
};

export default FormInputRange;