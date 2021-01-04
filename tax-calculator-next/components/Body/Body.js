import React, { useState, useEffect } from 'react';

/* React Bootstrap */
import { Container, Row, Col, Button, Jumbotron, Form, FormControl, InputGroup } from 'react-bootstrap';

/* Custom component */
import IncomeTable from '../common/IncomeTable';
import FormInputRange from './FormInputRange';

const Body = props => {
  const [validated, setValidated] = useState(false),    
    [provinceDDVal, setProvinceDDVal] = useState(""),
    [currentProvinceTaxRule, setCurrentProvinceTaxRule] = useState([]),
    [ddVal, setDDVal] = useState("");

  useEffect(() => {

  });

  const handleDDChange = event => {
    this.setState({ setDDVal: event.target.value });
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }

  let dummy = {
    "annual": 50,
    "monthly": 20,
    "biWeekly": 10,
    "weekly": 5
  };

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
            <Form action="#" noValidate validated={validated} onSubmit={handleSubmit} >
              <Form.Group controlId="formSelectProvince">
                <Form.Label>{props.bodyContent.provinceDD}</Form.Label>
                <Form.Control as="select" required>
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

              {/* Hourly Rate */}
              <FormInputRange
                controlId="formHourlYRate"
                iconName="monetization_on"
                label={props.bodyContent.hourlyRateLabel}
                errorMessage={props.bodyContent.errorMessage.missingHourlyRate}
                rangeMax="1000"
              />

              {/* Working hour in a week */}
              <FormInputRange
                controlId="formWorkingWeeklyHour"
                iconName="hourglass_top"
                label={props.bodyContent.workingHoursInWeekLabel}
                errorMessage={props.bodyContent.errorMessage.missingWeeklyHours}
                rangeMax="60"
              />
              
              {/* Working weeks in a year */}
              <FormInputRange
                controlId="formWorkingWeekAnnual"
                iconName="date_range"
                label={props.bodyContent.totalWorkingWeeksInAYear}
                errorMessage={props.bodyContent.errorMessage.missingAnnualWeeks}
                rangeMax="52"
              />

              <Button variant="success" size="sm" block type="submit">
                {props.bodyContent.calculateBtn}
              </Button>
            </Form>
          </Col>

          <Col>
            <h2>{props.bodyContent.resultTitle}</h2>
            <Row>
              <Col xs={12}>
                <IncomeTable
                  caption={props.bodyContent.resultTable.beforeTaxCaption}
                  theader={props.bodyContent.resultTable.headers}
                  tableBody={dummy}
                />
              </Col>
              <Col>
                <IncomeTable
                  caption={props.bodyContent.resultTable.afterTaxCaption}
                  theader={props.bodyContent.resultTable.headers}
                  tableBody={dummy}
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
