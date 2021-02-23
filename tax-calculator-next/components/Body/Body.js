import React, { useState, useContext } from 'react';

import CanadaTaxRule from '../../data/CanadaTaxRule.json';

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
import BodyStyle from './body.module.scss';

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
      let weeklyAmountBeforeTax = (income / DEFAULT_ANNUAL_WEEKS),
        hourlyAmountBeforeTax = selectedHoursForEmpIncome === "" ? "0" : (weeklyAmountBeforeTax / parseFloat(selectedHoursForEmpIncome)).toLocaleString();

      let salBeforeTax = {
        "annual": convertStringToLocale(income),
        "monthly": convertStringToLocale(income / 12),
        "biWeekly": convertStringToLocale(income / DEFAULT_ANNUAL_BI_WEEKS),
        "weekly": convertStringToLocale(weeklyAmountBeforeTax),
        "hourly": convertStringToLocale(hourlyAmountBeforeTax)
      },
        salAfterTax = {};

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
      for (let taxRule in TAXRULES_CA) {
        const TAXRULES_PROVINCES_CA = TAXRULES_CA[taxRule];
        if (selectedProvince == taxRule) {
          for (let taxrulesProvince in TAXRULES_PROVINCES_CA) {
            selectedProvinceTax.push(TAXRULES_PROVINCES_CA[taxrulesProvince]);
          }
        }
      }

      const PROTAX_CA = taxCal(income, selectedProvinceTax[0].max, selectedProvinceTax[1].max, selectedProvinceTax[2].max, selectedProvinceTax[3].max, selectedProvinceTax[4].max, selectedProvinceTax[0].taxRate, selectedProvinceTax[1].taxRate, selectedProvinceTax[2].taxRate, selectedProvinceTax[3].taxRate, selectedProvinceTax[4].taxRate)

      //Calculating Federal tax 

      const FEDTAX_CA = taxCal(income, CanadaTaxRule.federalTax.tire1.max, CanadaTaxRule.federalTax.tire2.max, CanadaTaxRule.federalTax.tire3.max, CanadaTaxRule.federalTax.tire4.max, CanadaTaxRule.federalTax.tire5.max, CanadaTaxRule.federalTax.tire1.taxRate, CanadaTaxRule.federalTax.tire2.taxRate, CanadaTaxRule.federalTax.tire3.taxRate, CanadaTaxRule.federalTax.tire4.taxRate, CanadaTaxRule.federalTax.tire5.taxRate);

      //Calculating Total tax 

      const TOTALTAX_CA = income - (FEDTAX_CA + PROTAX_CA);

      let weeklyAmountAfterTax = (TOTALTAX_CA / DEFAULT_ANNUAL_WEEKS),
        hourlyAmountAfterTax = selectedHoursForEmpIncome === "" ? "0" : (weeklyAmountAfterTax / parseFloat(selectedHoursForEmpIncome)).toLocaleString();

      salAfterTax = {
        "annual": TOTALTAX_CA.toLocaleString(),
        "monthly": (TOTALTAX_CA / 12).toLocaleString(),
        "biWeekly": (TOTALTAX_CA / DEFAULT_ANNUAL_BI_WEEKS).toLocaleString(),
        "weekly": (TOTALTAX_CA / DEFAULT_ANNUAL_WEEKS).toLocaleString(),
        "hourly": hourlyAmountAfterTax
      }

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
          <Col>
            <CardUp cardTitle={content.body.CalculationTitle} cardAssent={BodyStyle.card_up__color__teal}>
              <Form action="#" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formSelectProvince">
                  <Form.Label>{content.body.provinceDD}</Form.Label>
                  <Form.Control as="select" required value={provinceDDVal} onChange={handleDDChange} className={BodyStyle.gotax_dropdown}>
                    <option value="" disabled>{content.body.provinceDD}</option>
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

          <Col>
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
