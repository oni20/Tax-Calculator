import React, { useContext, useReducer } from 'react';
import { Col, Form } from 'react-bootstrap';

/* Custom component */
import Layout from './Layout';
import {
  DEFAULT_SALARY_STATUS,
  InputControlList
} from '../../utility/config';
import {
  CalculateTax,
  GetCPPAndEI,
  GetSalaryAfterTax,
  convertStringToLocale,
  convertStringToNumber
} from '../../utility/helper';
import FormInputRange from './FormInputRange';
import CardUp from '../common/CardUp';
import ResultCard from './ResultCard';
import { GlobalContext } from '../Context/GlobalContext';
import { ResultContext } from './ResultContext';
import AlertMessage from '../common/AlertMessage';
import LottiePlayer from '../common/LottiePlayer';
import EmploymentTypeContainer from './EmploymentTypeContainer';
import {
  initialState,
  BodyReducer
} from './Reducer/BodyReducer';
import {
  SET_VALIDATION,
  SET_EMPLOYMENTINCOMEQUERY,
  SET_PROVINCE
} from '../Constants';

/* Styling */
import BodyStyle from './body.module.scss';

const Body = () => {
  const [state, dispatch] = useReducer(BodyReducer, initialState);

  const { content } = useContext(GlobalContext),
    { setSalaryStatus } = useContext(ResultContext);

  const handleDDChange = event => {
    dispatch({
      type: SET_PROVINCE,
      isDisableControl: (event.target.value === ''),
      provinceDDVal: event.target.value
    });
  };

  const handleEmploymentTypeRadio = event => {
    dispatch({
      type: SET_EMPLOYMENTINCOMEQUERY,
      incomeType: event.target.value,
      isEmploymentIncomeQuery: event.target.value
    });

    setSalaryStatus(DEFAULT_SALARY_STATUS);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    let isFormValid = form.checkValidity();

    if (isFormValid) {
      // Calculate tax information
      calculateSalary();
    }

    dispatch({
      type: SET_VALIDATION,
      validated: isFormValid
    });
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
      selectedHoursForEmpIncome = state.isEmploymentIncomeQuery === 'personalIncome' && form.formEmpIncomeHourly ? form.formEmpIncomeHourly.value : '';

    income = state.isEmploymentIncomeQuery === 'personalIncome' && form.formEmpIncome
      ? form.formEmpIncome.value === '' ? null : convertStringToNumber(form.formEmpIncome.value)
      : state.isEmploymentIncomeQuery === 'selfIncome'
        ? null //calculateSelfIncomeSal(form) code is closed for now
        : null;

    if (income) {
      let salAfterTax = income === 0 ? DEFAULT_SALARY_STATUS : {};

      if (income !== 0) {
        let rrspTaxSavings = 0;

        // Calculating Federal tax 
        const FEDTAX_CA = CalculateTax(income, 'federalTax');

        // Calculating Provincial Tax
        const PROTAX_CA = CalculateTax(income, 'provincialTax', state.provinceDDVal);

        // Calculating RRSP
        const RRSP = convertStringToNumber(form.formEmpIncomeRRSP.value);

        if (RRSP > 0) {
          const incomeRrsp = income - RRSP,
            protaxRrspCa = CalculateTax(incomeRrsp, 'provincialTax', state.provinceDDVal),
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

  const LeftHandComponent = () => {
    return (
      <CardUp cardTitle={content.body.CalculationTitle} cardAssent={BodyStyle.card_up__color__teal}>
        <Form action='#' noValidate validated={state.validated} onSubmit={handleSubmit}>

          <Form.Group controlId='formSelectProvince'>
            <Form.Label>{content.body.provinceDD}</Form.Label>
            <Form.Control as='select' required value={state.provinceDDVal}
              onChange={handleDDChange} className={BodyStyle.gotax_dropdown}>
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
          <EmploymentTypeContainer
            currentValue={state.incomeType}
            onChange={handleEmploymentTypeRadio}
            isDisabled={state.isDisableControl}
          />

          {/* Input controls with Range */}
          {
            state.isEmploymentIncomeQuery === 'selfIncome' ?
              <>
                <LottiePlayer
                  imageSource="https://assets3.lottiefiles.com/packages/lf20_hntzYU.json"
                />
                <AlertMessage
                  alertType='warning'
                  message={content.body.screenMessage.warningMsg}
                  icon='<span class="material-icons">engineering</span>'
                  countDown='May 1, 2022 00:00:00' />
              </>
              :
              InputControlList.map((inputObj, idx) => {
                return (
                  state.isEmploymentIncomeQuery === inputObj.isEmploymentIncomeQuery &&
                  <FormInputRange
                    key={idx}
                    isEmploymentIncomeQuery={state.isEmploymentIncomeQuery}
                    isRequired={inputObj.isRequired ? inputObj.isRequired : false}
                    isDisabled={state.isDisableControl}
                    inputclassName={BodyStyle.customInput}
                    controlId={inputObj.controlId}
                    iconName={inputObj.iconName}
                    label={content.body[inputObj.labelKeyName]}
                    errorMessage={
                      inputObj.errorMessageKeyName && inputObj.errorMessageKeyName === ''
                        ? ''
                        : content.body.errorMessage[inputObj.errorMessageKeyName]
                    }
                    rangeMax={inputObj.rangeMax}
                  />
                );
              })
          }

          <div className='mt-5 d-flex justify-content-center'>
            <button className='button__primary' type='submit'
              disabled={state.isEmploymentIncomeQuery === '' || state.isEmploymentIncomeQuery === 'selfIncome'}>
              {content.body.calculateBtn}
            </button>
          </div>
        </Form>
      </CardUp>
    );
  };

  const RightHandComponent = () => {
    return (
      <div role="region" aria-live="polite">
        <ResultCard
          isEmploymentIncomeQuery={state.isEmploymentIncomeQuery}
        />
      </div>
    );
  };

  return (
    <Layout leftOrientation={{
      desktopScreen: 5,
      mobileScreen: 12
    }} rightOrientation={{
      desktopScreen: 7,
      mobileScreen: 12
    }} >
      <LeftHandComponent />
      <RightHandComponent />
    </Layout >
  );
};

export default Body;
