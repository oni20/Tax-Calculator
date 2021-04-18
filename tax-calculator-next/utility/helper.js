import {
    DEFAULT_ANNUAL_WEEKS,
    DEFAULT_ANNUAL_BI_WEEKS,
    DEFAULT_ANNUAL_WORKING_DAYS,
    DEFAULT_ANNUAL_WEEKLY_HOURS
} from './config';

import CanadaTaxRule from '../data/CanadaTaxRule.json';

export const convertStringToLocale = param => {
    if (typeof (param) == 'number') {
        return param.toLocaleString();
    } else {
        if (param.lastIndexOf('.') == (param.length - 1)) {
            return param;
        } else {
            return convertStringToNumber(param).toLocaleString();
        }
    }
}

export const convertStringToNumber = param => Number(param.replace(/[^0-9-.]+/g, ''));

// Get CPP and EI
export const GetCPPAndEI = income => {
    let cppTotal = 0;

    if (income > CanadaTaxRule.others.cpp.exemption) {
        cppTotal = ((income - CanadaTaxRule.others.cpp.exemption) * CanadaTaxRule.others.cpp.cpprate) / 100;
        cppTotal = cppTotal > CanadaTaxRule.others.cpp.maxContribution ? CanadaTaxRule.others.cpp.maxContribution : cppTotal;
    }

    let ei = (income * CanadaTaxRule.others.ei.eirate) / 100,
        eiTotal = ei < CanadaTaxRule.others.ei.maxContribution ? ei : CanadaTaxRule.others.ei.maxContribution;

    return { cppTotal, eiTotal }
};

//Calculate both federal and provience tax
export const CalculateTax = (income, taxType, selectedProvince = null) => {
    let previousTireTaxAmount = 0, bracketTaxAmount = 0,
        TaxRuleObj = selectedProvince ? CanadaTaxRule[taxType][selectedProvince] : CanadaTaxRule[taxType];

    for (let key in TaxRuleObj) {
        let isUnderRightBracket = (TaxRuleObj[key].min && income > TaxRuleObj[key].min) && (income <= TaxRuleObj[key].max || TaxRuleObj[key].max);
    
        if (isUnderRightBracket) {
            bracketTaxAmount = (income - TaxRuleObj[key].min) * (TaxRuleObj[key].taxRate / 100);
            break;
        } else {
            income > TaxRuleObj[key].min && (previousTireTaxAmount += ((TaxRuleObj[key].max - TaxRuleObj[key].min) * (TaxRuleObj[key].taxRate / 100)))
        }
    }
    return previousTireTaxAmount + bracketTaxAmount;
};


// Return Salary after tax object
export const GetSalaryAfterTax = (salaryData) => {
    const { income, FEDTAX_CA, PROTAX_CA, cppTotal, eiTotal, rrspTaxSavings } = salaryData,
        TOTAL_TAX = FEDTAX_CA + PROTAX_CA + cppTotal + eiTotal,
        NET_INCOME = rrspTaxSavings > 0 ? income - TOTAL_TAX + rrspTaxSavings : income - TOTAL_TAX,
        frequency = ['year', 'month', 'biweekly', 'week', 'day', 'hour'],
        divisibleMapper = {
            'year': 1,
            'month': 12,
            'biweekly': DEFAULT_ANNUAL_BI_WEEKS,
            'week': DEFAULT_ANNUAL_WEEKS,
            'day': DEFAULT_ANNUAL_WORKING_DAYS,
            'hour': (DEFAULT_ANNUAL_WEEKS * DEFAULT_ANNUAL_WEEKLY_HOURS)
        }, salAfterTax = {};

    frequency.map(salFreq => {
        salAfterTax[salFreq] = {
            'income': (income / divisibleMapper[salFreq]).toLocaleString(),
            'federal': (FEDTAX_CA / divisibleMapper[salFreq]).toLocaleString(),
            'provincial': (PROTAX_CA / divisibleMapper[salFreq]).toLocaleString(),
            'cpp': (cppTotal / divisibleMapper[salFreq]).toLocaleString(),
            'ei': (eiTotal / divisibleMapper[salFreq]).toLocaleString(),
            'rrspsavings': (rrspTaxSavings / divisibleMapper[salFreq]).toLocaleString(),
            'totalTax': (TOTAL_TAX / divisibleMapper[salFreq]).toLocaleString(),
            'annual': (NET_INCOME / divisibleMapper[salFreq]).toLocaleString()
        }
    });
    return salAfterTax;
}