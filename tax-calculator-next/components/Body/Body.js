import { React, useState } from 'react';

/* React Bootstrap */
import { Container, Row, Col, Button, Jumbotron, Form, FormControl, InputGroup } from 'react-bootstrap';

/* Custom component */
import InputControlList from '../../utility/config';
import IncomeTable from '../common/IncomeTable';
import FormInputRange from './FormInputRange';
import { convertStringToNumber } from '../../utility/helper';

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
    [isDisableControl, setIsDisableControl] = useState(true),
    [provinceDDVal, setProvinceDDVal] = useState("");

  const handleDDChange = event => {
    setIsDisableControl(event.target.value == "");
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
    const form = event.currentTarget,
      targetElementID = event.target.id;

    let income;

    if (targetElementID === "formEmploymentIncome") {
      // Perform reverse calculation
      let employmentIncomeBeforeTax = convertStringToNumber(event.target.value);

      form.formWorkingWeekAnnual.value = 52;
      form.formWorkingWeeklyHour.value = 40;
      form.formHourlyRate.value = Math.ceil(employmentIncomeBeforeTax / 2080);

      form.formWorkingWeekAnnualRange.value = 52;
      form.formWorkingWeeklyHourRange.value = 40;
      form.formHourlyRateRange.value = Math.ceil(employmentIncomeBeforeTax / 2080);

      income = employmentIncomeBeforeTax;
    } else {
      if (form.formSelectProvince.value !== "" &&
        (form.formHourlyRate.value !== "" && form.formHourlyRate.value !== "0") &&
        (form.formWorkingWeeklyHour.value !== "" && form.formWorkingWeeklyHour.value !== "0") &&
        (form.formWorkingWeekAnnual.value !== "" && form.formWorkingWeekAnnual.value !== "0")
      ) {
        let selectedProvince = form.formSelectProvince.value,
          hourlyRate = convertStringToNumber(form.formHourlyRate.value),
          weeklyHours = convertStringToNumber(form.formWorkingWeeklyHour.value),
          annualHours = convertStringToNumber(form.formWorkingWeekAnnual.value),
          totalIncomeBeforeTax = hourlyRate * weeklyHours * annualHours;

        income = totalIncomeBeforeTax;
      }
    }
    if (income !== undefined) {
      setResultSetBeforeTax({
        "annual": (income).toLocaleString(),
        "monthly": (income / 12).toLocaleString(),
        "biWeekly": (income / 26).toLocaleString(),
        "weekly": (income / 52).toLocaleString()
      });
    }
  }

  return (
    <>
      <Jumbotron fluid>
        <Container>
          <h1>{props.bodyContent.introTitle}</h1>
          <p>{props.bodyContent.introDesc.replace("$currYear$", new Date().getFullYear())}</p>
        </Container>
      </Jumbotron>

      <Container>
        <Row>
          <Col xs={12} sm={5} md={5} lg={5}>
            <Form action="#" noValidate validated={validated} onSubmit={handleSubmit} onChange={calculateSalary}>
              <Form.Group controlId="formSelectProvince">
                <Form.Label>{props.bodyContent.provinceDD}</Form.Label>
                <Form.Control as="select" size="sm" required value={provinceDDVal} onChange={handleDDChange} custom>
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
                      isRequired={inputObj.isRequired ? inputObj.isRequired : false}
                      isDisabled={isDisableControl}
                      inputClass={BodyStyle.customInput}
                      controlId={inputObj.controlId}
                      iconName={inputObj.iconName}
                      label={props.bodyContent[inputObj.labelKeyName]}
                      errorMessage={
                        inputObj.errorMessageKeyName && inputObj.errorMessageKeyName == ""
                          ? ""
                          : props.bodyContent.errorMessage[inputObj.errorMessageKeyName]
                      }
                      rangeMax={inputObj.rangeMax ? inputObj.rangeMax : null}
                    />
                  )
                })
              }

              <Button variant="success" size="sm" block type="submit">
                {props.bodyContent.calculateBtn}
              </Button>
            </Form>
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
