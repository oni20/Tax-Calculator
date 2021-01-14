import { React, useState } from 'react';

/* React Bootstrap */
import { Container, Row, Col, Button, Jumbotron, Form, FormControl, InputGroup } from 'react-bootstrap';

/* Custom component */
import InputControlList from '../../utility/config';
import IncomeTable from '../common/IncomeTable';
import FormInputRange from './FormInputRange';
import Hero from '../common/Hero'

import BodyStyle from '../../styles/Body.module.scss';

const Body = props => {
  const [validated, setValidated] = useState(false),
    [resultSetBeforeTax, setResultSetBeforeTax] = useState({
      "annual": 0,
      "monthly": 0,
      "biWeekly": 0,
      "weekly": 0
    }),
    [resultSetAfterTax, setResultSetAfterTax] = useState({
      "annual": 0,
      "monthly": 0,
      "biWeekly": 0,
      "weekly": 0
    }),
    [provinceDDVal, setProvinceDDVal] = useState("");

  const handleDDChange = event => {
    setProvinceDDVal(event.target.value);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() !== false) {
      // Calculate tax information
      calculateSalary(event);
    }
    setValidated(true);
  }

  const calculateSalary = event => {
    const form = event.currentTarget;

    if (form.formSelectProvince.value !== "" &&
      (form.formHourlyRate.value !== "" && form.formHourlyRate.value !== "0") &&
      (form.formWorkingWeeklyHour.value !== "" && form.formWorkingWeeklyHour.value !== "0") &&
      (form.formWorkingWeekAnnual.value !== "" && form.formWorkingWeekAnnual.value !== "0")
    ) {
      let selectedProvince = form.formSelectProvince.value,
        hourlyRate = form.formHourlyRate.value,
        weeklyHours = form.formWorkingWeeklyHour.value,
        annualHours = form.formWorkingWeekAnnual.value,
        totalIncomeBeforeTax = hourlyRate * weeklyHours * annualHours;

      setResultSetBeforeTax({
        "annual": (totalIncomeBeforeTax).toLocaleString(),
        "monthly": (totalIncomeBeforeTax / 12).toLocaleString(),
        "biWeekly": (totalIncomeBeforeTax / 26).toLocaleString(),
        "weekly": (totalIncomeBeforeTax / 52).toLocaleString()
      });
    }
  }

  return (
    <>
    <Hero
    introTitle={props.bodyContent.introTitle}
    introDesc={props.bodyContent.introDesc.replace("$currYear$", new Date().getFullYear())}
    ></Hero>

      <Container className="mt-5">
        <Row>
          <Col xs={12} sm={5} md={5} lg={5}>
            <div className="card-up"> 
            <h2 className = "text-center font-weight-bold heading__h2 mb-5" > Enter your details </h2>  
            <Form action="#" noValidate validated={validated} onSubmit={handleSubmit} onChange={calculateSalary}>
              <Form.Group controlId="formSelectProvince">
                <Form.Label>{props.bodyContent.provinceDD}</Form.Label>
                <Form.Control as="select" required value={provinceDDVal} onChange={handleDDChange}>
                  <option value="">{props.bodyContent.provinceDD}</option>
                  {
                    props.bodyContent.provinceList.map((province, index) => {
                      return <option key={index} value={province.id}>{province.displayText}</option>
                    })
                  }
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {props.bodyContent.errorMessage.missingProvince}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Input controls with Range */}
              {
                InputControlList.map((inputObj, idx) => {
                  return (
                    <FormInputRange
                      key={idx}
                      inputClass={BodyStyle.customInput}
                      controlId={inputObj.controlId}
                      iconName={inputObj.iconName}
                      label={props.bodyContent[inputObj.labelKeyName]}
                      errorMessage={props.bodyContent.errorMessage[inputObj.errorMessageKeyName]}
                      rangeMax={inputObj.rangeMax}
                    />
                  )
                })
              }
              <div className="d-flex justify-content-center">
              <button className="button__primary" type="submit">
                {props.bodyContent.calculateBtn}
              </button>
              </div>
            </Form>
            </div>
          </Col>

          <Col>
            <h2>{props.bodyContent.resultTitle}</h2>
            <Row>
              <Col xs={12}>
                {/* Before tax */}
                <IncomeTable
                  caption={props.bodyContent.resultTable.beforeTaxCaption}
                  theader={props.bodyContent.resultTable.headers}
                  tableBody={resultSetBeforeTax}
                />
              </Col>
              <Col>
                {/* After tax */}
                <IncomeTable
                  caption={props.bodyContent.resultTable.afterTaxCaption}
                  theader={props.bodyContent.resultTable.headers}
                  tableBody={resultSetAfterTax}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Body;
