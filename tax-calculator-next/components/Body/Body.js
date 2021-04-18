import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

/* Custom component */
import {
  DEFAULT_SALARY_STATUS,
  InputControlList
} from '../../utility/config';
import { CalculateTax, GetCPPAndEI, GetSalaryAfterTax } from '../../utility/helper';
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
    setIsDisableControl(event.target.value === '');
    setProvinceDDVal(event.target.value);
  };

  const handleEmploymentTypeRadio = event => {
    setIsEmploymentIncomeQuery(event.target.value);
    setSalaryStatus(DEFAULT_SALARY_STATUS);
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
      income = null,
      selectedHoursForEmpIncome = isEmploymentIncomeQuery === 'personalIncome' && form.formEmpIncomeHourly ? form.formEmpIncomeHourly.value : '';

    income = isEmploymentIncomeQuery === 'personalIncome' && form.formEmpIncome
      ? form.formEmpIncome.value === '' ? null : convertStringToNumber(form.formEmpIncome.value)
      : isEmploymentIncomeQuery === 'selfIncome'
        ? null //calculateSelfIncomeSal(form) code is closed for now
        : null;

    if (income !== null && income !== undefined) {
      let salAfterTax = income === 0 ? DEFAULT_SALARY_STATUS : {};

      if (income !== 0) {
        let rrspTaxSavings = 0;

        // Calculating Federal tax 
        const FEDTAX_CA = CalculateTax(income, 'federalTax');

        // Calculating Provincial Tax
        const PROTAX_CA = CalculateTax(income, 'provincialTax', provinceDDVal);

        // Calculating RRSP
        const RRSP = convertStringToNumber(form.formEmpIncomeRRSP.value);

        if (RRSP > 0) {
          const incomeRrsp = income - RRSP,
            protaxRrspCa = CalculateTax(incomeRrsp, 'provincialTax', provinceDDVal),
            fedtaxRrspCa = CalculateTax(incomeRrsp, 'federalTax');

          rrspTaxSavings = (FEDTAX_CA + PROTAX_CA) - (fedtaxRrspCa + protaxRrspCa);
        }

        //Calculating CPP and EI
        const { cppTotal, eiTotal } = GetCPPAndEI(income);
        
        salAfterTax = GetSalaryAfterTax({
          income,
          FEDTAX_CA,
          PROTAX_CA,
          cppTotal,
          eiTotal,
          rrspTaxSavings
        });
      }

      setSalaryStatus(salAfterTax);
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
              <Form action='#' noValidate validated={validated} onSubmit={handleSubmit}>
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
                              className="mb-1"
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
                            inputObj.errorMessageKeyName && inputObj.errorMessageKeyName === ''
                              ? ''
                              : content.body.errorMessage[inputObj.errorMessageKeyName]
                          }
                          rangeMax={inputObj.rangeMax ? inputObj.rangeMax : null}
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
            <div role="region" aria-live="polite">
              <ResultCard
                isEmploymentIncomeQuery={isEmploymentIncomeQuery}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Body;
