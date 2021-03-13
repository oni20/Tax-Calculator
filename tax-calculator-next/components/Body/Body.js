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
import { taxCal } from '../../utility/helper';
import FormInputRange from './FormInputRange';
import { convertStringToLocale, convertStringToNumber } from '../../utility/helper';
import Hero from '../common/Hero';
import CardUp from '../common/CardUp';
import ResultCard from './ResultCard';
import { GlobalContext } from '../Context/GlobalContext';
import { ResultContext } from './ResultContext';
import AlertMessage from '../common/AlertMessage';
import LottiePlayer from '../common/LottiePlayer';

/* Styling */
import BodyStyle from './body.module.scss';

const Body = () => {
  const { content } = useContext(GlobalContext),
    { setSalaryStatus } = useContext(ResultContext),
    [validated, setValidated] = useState(false),
    [isEmploymentIncomeQuery, setIsEmploymentIncomeQuery] = useState(null),
    [isDisableControl, setIsDisableControl] = useState(true),
    [provinceDDVal, setProvinceDDVal] = useState('');

  const handleDDChange = event => {
    setIsDisableControl(event.target.value == '');
    setProvinceDDVal(event.target.value);
  };

  const handleEmploymentTypeRadio = event => {
    setIsEmploymentIncomeQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      // Calculate tax information
      calculateSalary();
    }
    setValidated(true);
  };

  const calculateSelfIncomeSal = (form) => {
    let retVal;

    if (form.formSelfIncomeHourlyRate.value !== '' && form.formSelfIncomeHourlyRate.value !== '0' &&
      form.formSelfIncomeWorkingWeeklyHour.value !== '' && form.formSelfIncomeWorkingWeeklyHour.value !== '0' &&
      form.formSelfIncomeWorkingWeekAnnual.value !== '' && form.formSelfIncomeWorkingWeekAnnual.value !== '0'
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
  };

  const calculateSalary = () => {
    let form = document.getElementsByTagName('form')[0],
      selectedProvince = form.formSelectProvince.value, income = null,
      isEmploymentIncomeQuery = form.incomeTypeRadio.value,
      selectedHoursForEmpIncome = isEmploymentIncomeQuery === 'personalIncome' && form.formEmpIncomeHourly ? form.formEmpIncomeHourly.value : '';

    income = isEmploymentIncomeQuery === 'personalIncome' && form.formEmpIncome
      ? form.formEmpIncome.value === '' ? null : convertStringToNumber(form.formEmpIncome.value)
      : isEmploymentIncomeQuery === 'selfIncome'
        ? null //calculateSelfIncomeSal(form) code is closed for now
        : null;

    if (income !== null && income !== undefined) {
      let weeklyAmountBeforeTax = (income / DEFAULT_ANNUAL_WEEKS),
        hourlyAmountBeforeTax = (weeklyAmountBeforeTax / parseFloat(selectedHoursForEmpIncome)).toLocaleString();

      let salBeforeTax = {
        'annual': convertStringToLocale(income),
        'monthly': convertStringToLocale(income / 12),
        'biWeekly': convertStringToLocale(income / DEFAULT_ANNUAL_BI_WEEKS),
        'weekly': convertStringToLocale(weeklyAmountBeforeTax),
        'hourly': ['', '0'].indexOf(selectedHoursForEmpIncome) > -1 ? '0' : hourlyAmountBeforeTax
      },
        salAfterTax = income == 0 ? salBeforeTax : {};

      if (income !== 0) {
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

        const PROTAX_CA = taxCal(income, selectedProvinceTax[0].max, selectedProvinceTax[1].max, selectedProvinceTax[2].max, selectedProvinceTax[3].max, selectedProvinceTax[4].max, selectedProvinceTax[0].taxRate, selectedProvinceTax[1].taxRate, selectedProvinceTax[2].taxRate, selectedProvinceTax[3].taxRate, selectedProvinceTax[4].taxRate);

        //Calculating Federal tax 

        const FEDTAX_CA = taxCal(income, CanadaTaxRule.federalTax.tire1.max, CanadaTaxRule.federalTax.tire2.max, CanadaTaxRule.federalTax.tire3.max, CanadaTaxRule.federalTax.tire4.max, CanadaTaxRule.federalTax.tire5.max, CanadaTaxRule.federalTax.tire1.taxRate, CanadaTaxRule.federalTax.tire2.taxRate, CanadaTaxRule.federalTax.tire3.taxRate, CanadaTaxRule.federalTax.tire4.taxRate, CanadaTaxRule.federalTax.tire5.taxRate);

        //Calculating Total tax 

        const TOTALTAX_CA = income - (FEDTAX_CA + PROTAX_CA);

        let weeklyAmountAfterTax = (TOTALTAX_CA / DEFAULT_ANNUAL_WEEKS),
          hourlyAmountAfterTax = (weeklyAmountAfterTax / parseFloat(selectedHoursForEmpIncome)).toLocaleString();

        salAfterTax = {
          'annual': TOTALTAX_CA.toLocaleString(),
          'monthly': (TOTALTAX_CA / 12).toLocaleString(),
          'biWeekly': (TOTALTAX_CA / DEFAULT_ANNUAL_BI_WEEKS).toLocaleString(),
          'weekly': (TOTALTAX_CA / DEFAULT_ANNUAL_WEEKS).toLocaleString(),
          'hourly': ['', '0'].indexOf(selectedHoursForEmpIncome) > -1 ? '0' : hourlyAmountAfterTax
        };
      }

      setSalaryStatus(salBeforeTax, salAfterTax);
    }
  };

  return (
    <>
      <Hero
        introTitle={content.body.introTitle}
        introDesc={content.body.introDesc.replace('$currYear$', new Date().getFullYear())}
      ></Hero>

      <Container className='mt-5'>
        <Row>
          <Col sm={5} xs={12}>
            <CardUp cardTitle={content.body.CalculationTitle} cardAssent={BodyStyle.card_up__color__teal}>
              <Form action='#' noValidate validated={validated} onSubmit={handleSubmit} onChange={calculateSalary}>
                <Form.Group controlId='formSelectProvince'>
                  <Form.Label>{content.body.provinceDD}</Form.Label>
                  <Form.Control as='select' required value={provinceDDVal} onChange={handleDDChange} className={BodyStyle.gotax_dropdown}>
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

                {/* Employment Type */}
                <fieldset>
                  <Form.Group controlId='formSelectIncomeType'>
                    <Form.Label as='legend'>{content.body.incomeType.labelText}</Form.Label>
                    <Col sm={10}>
                      {
                        content.body.incomeType.type.map((radioVal, index) => {
                          return (
                            <Form.Check
                              key={index}
                              type='radio'
                              label={radioVal}
                              name='incomeTypeRadio'
                              value={index === 0 ? 'personalIncome' : 'selfIncome'}
                              id={'incomeTypeRadio' + index}
                              onChange={handleEmploymentTypeRadio}
                              disabled={isDisableControl}
                            />
                          );
                        })
                      }
                    </Col>
                  </Form.Group>
                </fieldset>

                {/* Input controls with Range */}
                {
                  isEmploymentIncomeQuery === 'selfIncome' ?
                    <>
                      <LottiePlayer
                        imageSource="https://assets3.lottiefiles.com/packages/lf20_hntzYU.json"
                      />
                      <AlertMessage
                        alertType='warning'
                        message={content.body.screenMessage.warningMsg}
                        icon='<span class="material-icons">engineering</span>'
                        countDown='May 1, 2021 00:00:00' />
                    </>
                    :
                    InputControlList.map((inputObj, idx) => {
                      return (
                        isEmploymentIncomeQuery === inputObj.isEmploymentIncomeQuery &&
                        <FormInputRange
                          key={idx}
                          isEmploymentIncomeQuery={isEmploymentIncomeQuery}
                          isRequired={inputObj.isRequired ? inputObj.isRequired : false}
                          isDisabled={isDisableControl}
                          inputclassName={BodyStyle.customInput}
                          controlId={inputObj.controlId}
                          iconName={inputObj.iconName}
                          label={content.body[inputObj.labelKeyName]}
                          errorMessage={
                            inputObj.errorMessageKeyName && inputObj.errorMessageKeyName == ''
                              ? ''
                              : content.body.errorMessage[inputObj.errorMessageKeyName]
                          }
                          rangeMax={inputObj.rangeMax ? inputObj.rangeMax : null}
                          calculateSalary={calculateSalary}
                        />
                      );
                    })
                }

                <div className='mt-5 d-flex justify-content-center'>
                  <button className='button__primary' type='submit' disabled={isEmploymentIncomeQuery === '' || isEmploymentIncomeQuery === 'selfIncome'}>
                    {content.body.calculateBtn}
                  </button>
                </div>
              </Form>
            </CardUp>
          </Col>

          <Col sm={7} xs={12}>
            <ResultCard
              isEmploymentIncomeQuery={isEmploymentIncomeQuery}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Body;
