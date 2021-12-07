import React, { useContext } from 'react';
import { Col, Form } from 'react-bootstrap';
import RadioButton from '../common/RadioButton';
import { GlobalContext } from '../Context/GlobalContext';
import { useFormContext } from './FormContext';
import { ResultContext } from './ResultContext';
import { SET_EMPLOYMENTINCOMEQUERY } from '../Constants';
import { DEFAULT_SALARY_STATUS } from '../../utility/config';

export default function EmploymentTypeContainer() {
    const { content } = useContext(GlobalContext);
    const { state, dispatch } = useFormContext();
    const { setSalaryStatus } = useContext(ResultContext);  
    const { incomeType, isDisableControl } = state;

    const handleEmploymentTypeRadio = event => {
        dispatch({
            type: SET_EMPLOYMENTINCOMEQUERY,
            incomeType: event.target.value,
            isEmploymentIncomeQuery: event.target.value
        });

        setSalaryStatus(DEFAULT_SALARY_STATUS);
    };

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
                                    currentValue={incomeType}
                                    id={'incomeTypeRadio' + index}
                                    onChange={handleEmploymentTypeRadio}
                                    isDisabled={isDisableControl}
                                />
                            );
                        })
                    }
                </Col>
            </Form.Group>
        </fieldset>
    );
};