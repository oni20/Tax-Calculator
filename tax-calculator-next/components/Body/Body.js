import React, { useState } from 'react';

import CanadaTaxRule from '../../data/CanadaTaxRule.json';

/* React Bootstrap */
import { Container, Row, Col, Button, Jumbotron, Form } from 'react-bootstrap';

/* Custom component */
import {
  DEFAULT_ANNUAL_WEEKS,
  DEFAULT_ANNUAL_BI_WEEKS,
  InputControlList
} from '../../utility/config';
import SalaryContainer from '../common/SalaryContainer';
import FormInputRange from './FormInputRange';
import { convertStringToNumber } from '../../utility/helper';
import Hero from '../common/Hero';
import CardUp from '../common/CardUp';

/* Styling */
import BodyStyle from '../../styles/Body.module.scss';

const Body = props => {
  const [validated, setValidated] = useState(false),
    [isEmploymentIncomeQuery, setIsEmploymentIncomeQuery] = useState(""),
    [resultSetBeforeTax, setResultSetBeforeTax] = useState({
      "annual": 0,
      "monthly": 0,
      "biWeekly": 0,
      "weekly": 0,
      "hourly": 0
    }),
    [resultSetAfterTax, setResultSetAfterTax] = useState({
      "annual": 0,
      "monthly": 0,
      "biWeekly": 0,
      "weekly": 0,
      "hourly": 0
    }),
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
      calculateSalary(event);
    }
    setValidated(true);
  }

  const calculateSelfIncomeSal = (form) => {
    let retVal;

    if (form.formHourlyRate.value !== "" && form.formHourlyRate.value !== "0" &&
      form.formWorkingWeeklyHour.value !== "" && form.formWorkingWeeklyHour.value !== "0" &&
      form.formWorkingWeekAnnual.value !== "" && form.formWorkingWeekAnnual.value !== "0"
    ) {
      let hourlyRate = convertStringToNumber(form.formHourlyRate.value),
        weeklyHours = convertStringToNumber(form.formWorkingWeeklyHour.value),
        annualHours = convertStringToNumber(form.formWorkingWeekAnnual.value),
        totalIncomeBeforeTax = hourlyRate * weeklyHours * annualHours;

      retVal = totalIncomeBeforeTax;
    } else {
      retVal = null;
    }

    return retVal;
  }

  const calculateSalary = event => {
    const form = event.currentTarget, targetElementID = event.target.id;
    let selectedProvince = form.formSelectProvince.value, income,
      selectedHoursForEmpIncome = isEmploymentIncomeQuery ? form.formEmploymentIncomeHourly.value : "";

    switch (targetElementID) {
      case "formSelectProvince":
        if (form.formSelectProvince.value !== "" && isEmploymentIncomeQuery !== "") {
          income = isEmploymentIncomeQuery
            ? convertStringToNumber(form.formEmploymentIncome.value)
            : calculateSelfIncomeSal(form);
        }
        break;

      case "formEmploymentIncome":
      case "formEmploymentIncomeHourly":
      case "formEmploymentIncomeHourlyRange":
        income = form.formEmploymentIncome.value === "" ? null : convertStringToNumber(form.formEmploymentIncome.value);
        break;

      case "formHourlyRate":
      case "formHourlyRateRange":
      case "formWorkingWeeklyHour":
      case "formWorkingWeeklyHourRange":
      case "formWorkingWeekAnnual":
      case "formWorkingWeekAnnualRange":
        income = calculateSelfIncomeSal(form);
        break;
      default:
        income = null;
        break;
    }

    if (income !== null && income !== undefined) {
      let weeklyAmount = (income / DEFAULT_ANNUAL_WEEKS),
        hourlyAmount = selectedHoursForEmpIncome === "" ? "0" : (weeklyAmount / parseFloat(selectedHoursForEmpIncome)).toLocaleString();

      setResultSetBeforeTax({
        "annual": (income).toLocaleString(),
        "monthly": (income / 12).toLocaleString(),
        "biWeekly": (income / DEFAULT_ANNUAL_BI_WEEKS).toLocaleString(),
        "weekly": weeklyAmount.toLocaleString(),
        "hourly": hourlyAmount
      });

      //Calculate both federal and provience tax 
      const taxCal = (income, tireMax1, tireMax2, tireMax3, tireMax4, tireMax5, tireTaxrate1, tireTaxrate2, tireTaxrate3, tireTaxrate4, tireTaxrate5) => {
        switch (true) {
          case (income <= tireMax1):
            if (tireMax1 !== null) {
              return (income * tireTaxrate1) / 100;
            }
            break;
          case (income <= tireMax2):
            if (tireMax2 !== null) {
              return ((tireMax1 * tireTaxrate1) / 100) + (((income - tireMax1) * tireTaxrate2) / 100);
            }
            break;
          case (income <= tireMax3):
            if (tireMax3 !== null) {
              return ((tireMax1 * tireTaxrate1) / 100) + (((tireMax2 - tireMax1) * tireTaxrate2) / 100) + (((income - tireMax2) * tireTaxrate3) / 100);
            }
            break;
          case (income <= tireMax4):
            if (tireMax4 !== null) {
              return ((tireMax1 * tireTaxrate1) / 100) + (((tireMax2 - tireMax1) * tireTaxrate2) / 100) + (((tireMax3 - tireMax2) * tireTaxrate3) / 100) + (((income - tireMax3) * tireTaxrate4) / 100);
            }
            break;
          case (income <= tireMax5):
            if (tireMax5 !== null) {
              return ((tireMax1 * tireTaxrate1) / 100) + (((tireMax2 - tireMax1) * tireTaxrate2) / 100) + (((tireMax3 - tireMax2) * tireTaxrate3) / 100) + (((tireMax4 - tireMax3) * tireTaxrate4) / 100) + (((income - tireMax4) * tireTaxrate5) / 100);
            }
            break;
          default:
            return ((tireMax1 * tireTaxrate1) / 100) + (((tireMax2 - tireMax1) * tireTaxrate2) / 100) + (((income - tireMax2) * tireTaxrate3) / 100);
        }
      }

      const TAXRULES_CA = CanadaTaxRule.provincialTax;
      let selectedProvinceTax = []; 

      //Calculating Province tax 
      for (let taxRule in TAXRULES_CA){
        const TAXRULES_PROVINCES_CA = TAXRULES_CA[taxRule];
        if (selectedProvince == taxRule){
          for (let taxrulesProvince in TAXRULES_PROVINCES_CA){
            selectedProvinceTax.push(TAXRULES_PROVINCES_CA[taxrulesProvince]);
          }
        }
      }

      const PROTAX_CA = taxCal(income, selectedProvinceTax[0].max, selectedProvinceTax[1].max, selectedProvinceTax[2].max, selectedProvinceTax[3].max, selectedProvinceTax[4].max, selectedProvinceTax[0].taxRate, selectedProvinceTax[1].taxRate, selectedProvinceTax[2].taxRate, selectedProvinceTax[3].taxRate, selectedProvinceTax[4].taxRate)

      //Calculating Federal tax 

      const FEDTAX_CA = taxCal(income, CanadaTaxRule.federalTax.tire1.max, CanadaTaxRule.federalTax.tire2.max, CanadaTaxRule.federalTax.tire3.max, CanadaTaxRule.federalTax.tire4.max, CanadaTaxRule.federalTax.tire5.max, CanadaTaxRule.federalTax.tire1.taxRate, CanadaTaxRule.federalTax.tire2.taxRate, CanadaTaxRule.federalTax.tire3.taxRate, CanadaTaxRule.federalTax.tire4.taxRate, CanadaTaxRule.federalTax.tire5.taxRate);
      
      //Calculating Total tax 

      const TOTALTAX_CA = income - (FEDTAX_CA + PROTAX_CA);
      
      setResultSetAfterTax({
        "annual": TOTALTAX_CA.toLocaleString(),
        "monthly": (TOTALTAX_CA / 12).toLocaleString(),
        "biWeekly": (TOTALTAX_CA / DEFAULT_ANNUAL_BI_WEEKS).toLocaleString(),
        "weekly": weeklyAmount.toLocaleString(),
        "hourly": hourlyAmount
      })
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
          <Col xs={12} sm={12} md={12} lg={5}>
            <CardUp cardTitle={props.bodyContent.CalculationTitle} cardAssent={BodyStyle.card_up__color__teal}>
              <Form action="#" noValidate validated={validated} onSubmit={handleSubmit} onChange={calculateSalary}>
                <Form.Group controlId="formSelectProvince">
                  <Form.Label>{props.bodyContent.provinceDD}</Form.Label>
                  <Form.Control as="select" required value={provinceDDVal} onChange={handleDDChange} className={BodyStyle.gotax_dropdown}>
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

                {/* Employment Type */}
                <fieldset>
                  <Form.Group controlId="formSelectIncomeType">
                    <Form.Label as="legend">{props.bodyContent.incomeType.labelText}</Form.Label>
                    <Col sm={10}>
                      {
                        props.bodyContent.incomeType.type.map((radioVal, index) => {
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

                <div className="mt-5 d-flex justify-content-center">
                  <button className="button__primary" type="submit">
                    {props.bodyContent.calculateBtn}
                  </button>
                </div>
              </Form>
            </CardUp>
          </Col>

          <Col xs={12} sm={12} md={12} lg={{ span: 6, offset: 1 }} className="mt-5 mt-lg-0">
            <CardUp cardTitle={props.bodyContent.resultTitle} cardAssent={BodyStyle.card_up__color__beige}>
              <Col xs={12}>
                {/* Before tax */}
                <SalaryContainer
                  caption={props.bodyContent.resultTable.beforeTaxCaption}
                  theader={props.bodyContent.resultTable.headers}
                  tableBody={resultSetBeforeTax}
                  isShowHourly={isEmploymentIncomeQuery === "" ? false : isEmploymentIncomeQuery}
                />
              </Col>
              <Col>
                {/* After tax */}
                <SalaryContainer
                  caption={props.bodyContent.resultTable.afterTaxCaption}
                  theader={props.bodyContent.resultTable.headers}
                  tableBody={resultSetAfterTax}
                  isShowHourly={isEmploymentIncomeQuery === "" ? false : isEmploymentIncomeQuery}
                />
              </Col>
            </CardUp>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Body;
