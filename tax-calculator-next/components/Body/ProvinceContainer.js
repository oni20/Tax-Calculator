import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { GlobalContext } from '../Context/GlobalContext';
import { useFormContext } from './FormContext';

/* REDUCERS*/
import {
    SET_PROVINCE
} from '../Constants';

export default function ProvinceContainer(props) {
    const { content } = useContext(GlobalContext);
    const { styleClass } = props;
    const { state, dispatch } = useFormContext();

    const handleDDChange = event => {
        dispatch({
            type: SET_PROVINCE,
            isDisableControl: (event.target.value === ''),
            provinceDDVal: event.target.value
        });
    };

    return (
        <Form.Group controlId='formSelectProvince'>
            <Form.Label>{content.body.provinceDD}</Form.Label>
            <Form.Control
                as='select'
                value={state.provinceDDVal}
                onChange={handleDDChange}
                className={styleClass}
                required>
                <option value='' disabled>{content.body.provinceDD}</option>
                {
                    content.body.provinceList.map((province, index) => {
                        return <option key={index} value={province.id}>{province.displayText}</option>;
                    })
                }
            </Form.Control>
            <Form.Control.Feedback type='invalid'>
                {content.body.errorMessage.missingProvince}
            </Form.Control.Feedback>
        </Form.Group>
    );
};