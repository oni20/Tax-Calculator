import React, { useContext, useReducer } from 'react';
import { Form } from 'react-bootstrap';

/* Custom component */
import Layout from './Layout';
import CardUp from '../common/CardUp';
import ResultCard from './ResultCard';
import ProvinceContainer from './ProvinceContainer';
import EmploymentTypeContainer from './EmploymentTypeContainer';
import MonetaryInfoContainer from './MonetaryInfoContainer';

/* Reducers */
import {
  initialState,
  BodyReducer
} from './Reducer/BodyReducer';
import { SET_VALIDATION } from '../Constants';

/* Contexts */
import { GlobalContext } from '../Context/GlobalContext';
import { ResultContext } from './ResultContext';
import FormContext from './FormContext';

/* Config */
import { DEFAULT_SALARY_STATUS } from '../../utility/config';
import {
  CalculateTax,
  GetCPPAndEI,
  GetSalaryAfterTax,
  convertStringToLocale,
  convertStringToNumber
} from '../../utility/helper';

/* Styling */
import BodyStyle from './body.module.scss';

const Body = () => {
  const [state, dispatch] = useReducer(BodyReducer, initialState);
  const formState = { state, dispatch };

  const { content } = useContext(GlobalContext);
  const { setSalaryStatus } = useContext(ResultContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
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

          {/* Province Dropdown */}
          <ProvinceContainer styleClass={BodyStyle.gotax_dropdown} />

          {/* Employment Type */}
          <EmploymentTypeContainer />

          {/* Input controls with Range */}
          <MonetaryInfoContainer styleInputClass={BodyStyle.customInput} />

          {/* Form Submit button */}
          <div className='mt-5 d-flex justify-content-center'>
            <button className='button__primary' type='submit'
              disabled={[null, '', 'selfIncome'].includes(state.isEmploymentIncomeQuery)}>
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
        <ResultCard />
      </div>
    );
  };

  return (
    <FormContext.Provider value={formState}>
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
    </FormContext.Provider>
  );
};

export default Body;
