import React, { useState, useContext } from 'react';

/* React Bootstrap */
import { Container, Row, Col, Form } from 'react-bootstrap';

/* Custom component */
import {
  DEFAULT_ANNUAL_WEEKS,
  DEFAULT_ANNUAL_BI_WEEKS,
  InputControlList
} from '../../utility/config';
import FormInputRange from './FormInputRange';
import { convertStringToLocale, convertStringToNumber } from '../../utility/helper';
import Hero from '../common/Hero';
import CardUp from '../common/CardUp';
import ResultCard from './ResultCard';
import { GlobalContext } from '../Context/GlobalContext';
import { ResultContext } from './ResultContext';

/* Styling */
import BodyStyle from '../../styles/Body.module.scss';

const Body = () => {
  const { content } = useContext(GlobalContext),
    { setSalaryStatus } = useContext(ResultContext),
    [validated, setValidated] = useState(false),
    [isEmploymentIncomeQuery, setIsEmploymentIncomeQuery] = useState(""),
    [isDisableControl, setIsDisableControl] = useState(true),
    [provinceDDVal, setProvinceDDVal] = useState("");

  const handleDDChange = event => {
    setIsDisableControl(event.target.value == "");
    setProvinceDDVal(event.target.value);
  }

  const handleEmploymentTypeRadio = event => {
    setIsEmploymentIncomeQuery(event.target.value === "incomeTypeRadio0");
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() !== false) {
      // Calculate tax information
      calculateSalary();
    }
    setValidated(true);
  }

  const calculateSelfIncomeSal = (form) => {
    let retVal;

    if (form.formSelfIncomeHourlyRate.value !== "" && form.formSelfIncomeHourlyRate.value !== "0" &&
      form.formSelfIncomeWorkingWeeklyHour.value !== "" && form.formSelfIncomeWorkingWeeklyHour.value !== "0" &&
      form.formSelfIncomeWorkingWeekAnnual.value !== "" && form.formSelfIncomeWorkingWeekAnnual.value !== "0"
    ) {
      let hourlyRate = convertStringToNumber(form.formSelfIncomeHourlyRate.value),
        weeklyHours = convertStringToNumber(form.formSelfIncomeWorkingWeeklyHour.value),
        annualHours = convertStringToNumber(form.formSelfIncomeWorkingWeekAnnual.value),
        totalIncomeBeforeTax = hourlyRate * weeklyHours * annualHours;

      retVal = totalIncomeBeforeTax;
    } else {
      retVal = null;
    }

    return retVal;
  }

  const calculateSalary = () => {
    let form = document.getElementsByTagName('form')[0],
      selectedProvince = form.formSelectProvince.value, income = null,
      selectedHoursForEmpIncome = isEmploymentIncomeQuery ? form.formEmpIncomeHourly.value : "";

    if (isEmploymentIncomeQuery) {
      income = form.formEmpIncome.value === "" ? null : convertStringToNumber(form.formEmpIncome.value);
    } else {
      income = calculateSelfIncomeSal(form);
    }

    /* case "formSelectProvince":
        if (form.formSelectProvince.value !== "" && isEmploymentIncomeQuery !== "") {
          income = isEmploymentIncomeQuery ? convertStringToNumber(form.formEmpIncome.value) : calculateSelfIncomeSal(form);
        }
        break; */

    if (income !== null && income !== undefined) {
      let weeklyAmount = (income / DEFAULT_ANNUAL_WEEKS),
        hourlyAmount = selectedHoursForEmpIncome === "" ? "0" : (weeklyAmount / parseFloat(selectedHoursForEmpIncome)).toLocaleString();

      let salBeforeTax = {
        "annual": convertStringToLocale(income),
        "monthly": convertStringToLocale(income / 12),
        "biWeekly": convertStringToLocale(income / DEFAULT_ANNUAL_BI_WEEKS),
        "weekly": convertStringToLocale(weeklyAmount),
        "hourly": convertStringToLocale(hourlyAmount)
      },
        salAfterTax = {
          "annual": 0,
          "monthly": 0,
          "biWeekly": 0,
          "weekly": 0,
          "hourly": 0
        };
      setSalaryStatus(salBeforeTax, salAfterTax);
    }
  }

  return (
    <>
      <Hero
        introTitle={content.body.introTitle}
        introDesc={content.body.introDesc.replace("$currYear$", new Date().getFullYear())}
      ></Hero>

      <Container className="mt-5">
        <Row>
          <Col xs={12} sm={5} md={5} lg={5}>
            <CardUp cardTitle={content.body.CalculationTitle} cardAssent={BodyStyle.card_up__color__teal}>
              <Form action="#" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formSelectProvince">
                  <Form.Label>{content.body.provinceDD}</Form.Label>
                  <Form.Control as="select" required value={provinceDDVal} onChange={handleDDChange} className={BodyStyle.gotax_dropdown}>
                    <option value="">{content.body.provinceDD}</option>
                    {
                      content.body.provinceList.map((province, index) => {
                        return <option key={index} value={province.id}>{province.displayText}</option>
                      })
                    }
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {content.body.errorMessage.missingProvince}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Employment Type */}
                <fieldset>
                  <Form.Group controlId="formSelectIncomeType">
                    <Form.Label as="legend">{content.body.incomeType.labelText}</Form.Label>
                    <Col sm={10}>
                      {
                        content.body.incomeType.type.map((radioVal, index) => {
                          return (
                            <Form.Check
                              key={index}
                              type="radio"
                              label={radioVal}
                              name="incomeTypeRadio"
                              value={"incomeTypeRadio" + index}
                              id={"incomeTypeRadio" + index}
                              onChange={handleEmploymentTypeRadio}
                              disabled={isDisableControl}
                            />
                          )
                        })
                      }
                    </Col>
                  </Form.Group>
                </fieldset>

                {/* Input controls with Range */}
                {
                  InputControlList.map((inputObj, idx) => {
                    return (
                      isEmploymentIncomeQuery === inputObj.isEmploymentIncomeQuery &&
                      <FormInputRange
                        key={idx}
                        isRequired={inputObj.isRequired ? inputObj.isRequired : false}
                        isDisabled={isDisableControl}
                        inputclassName={BodyStyle.customInput}
                        controlId={inputObj.controlId}
                        iconName={inputObj.iconName}
                        label={content.body[inputObj.labelKeyName]}
                        errorMessage={
                          inputObj.errorMessageKeyName && inputObj.errorMessageKeyName == ""
                            ? ""
                            : content.body.errorMessage[inputObj.errorMessageKeyName]
                        }
                        rangeMax={inputObj.rangeMax ? inputObj.rangeMax : null}
                        calculateSalary={calculateSalary}
                      />
                    )
                  })
                }

                <div className="mt-5 d-flex justify-content-center">
                  <button className="button__primary" type="submit">
                    {content.body.calculateBtn}
                  </button>
                </div>
              </Form>
            </CardUp>
          </Col>

          <Col xs={{ span: 6, offset: 1 }}>
            <ResultCard
              isEmploymentIncomeQuery={isEmploymentIncomeQuery}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Body;
