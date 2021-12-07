import React, { useContext } from 'react';
import { Col, Form } from 'react-bootstrap';
import RadioButton from '../common/RadioButton';
import { GlobalContext } from '../Context/GlobalContext';

export default function EmploymentTypeContainer(props) {
    const { content } = useContext(GlobalContext);
    const { currentValue, onChange, isDisabled } = props;

    return (
        <fieldset>
            <Form.Group controlId='formSelectIncomeType'>
                <Form.Label as='legend'>{content.body.incomeType.labelText}</Form.Label>
                <Col sm={10}>
                    {
                        content.body.incomeType.type.map((radioVal, index) => {
                            return (
                                <RadioButton
                                    key={index}
                                    style="mb-1"
                                    label={radioVal.label}
                                    name='incomeTypeRadio'
                                    value={radioVal.value}
                                    currentValue={currentValue}
                                    id={'incomeTypeRadio' + index}
                                    onChange={onChange}
                                    isDisabled={isDisabled}
                                />
                            );
                        })
                    }
                </Col>
            </Form.Group>
        </fieldset>
    );
};