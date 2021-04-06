import {
    DEFAULT_ANNUAL_WEEKS,
    DEFAULT_ANNUAL_BI_WEEKS,
    DEFAULT_ANNUAL_WORKING_DAYS,
    DEFAULT_ANNUAL_WEEKLY_HOURS,
    DEFAULT_SALARY_STATUS
} from './config';

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

//Calculate both federal and provience tax 
export const taxCal = (income, tireMax1, tireMax2, tireMax3, tireMax4, tireMax5, tireTaxrate1, tireTaxrate2, tireTaxrate3, tireTaxrate4, tireTaxrate5) => {
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
};

// Return Salary after tax object
export const getSalaryAfterTax = (salaryData) => {    
    const { income, FEDTAX_CA, PROTAX_CA, cppTotal, eiTotal, rrspTaxSavings } = salaryData,
        TOTAL_TAX = FEDTAX_CA + PROTAX_CA + cppTotal + eiTotal,
        NET_INCOME = rrspTaxSavings > 0 ? income - TOTAL_TAX + rrspTaxSavings : income - TOTAL_TAX;

    const salAfterTax = {
        'year': {
            'income': income.toLocaleString(),
            'federal': FEDTAX_CA.toLocaleString(),
            'provincial': PROTAX_CA.toLocaleString(),
            'cpp': cppTotal.toLocaleString(),
            'ei': eiTotal.toLocaleString(),
            'rrspsavings': rrspTaxSavings.toLocaleString(),
            'totalTax': TOTAL_TAX.toLocaleString(),
            'annual': NET_INCOME.toLocaleString()
        },
        'month': {
            'income': (income / 12).toLocaleString(),
            'federal': (FEDTAX_CA / 12).toLocaleString(),
            'provincial': (PROTAX_CA / 12).toLocaleString(),
            'cpp': (cppTotal / 12).toLocaleString(),
            'ei': (eiTotal / 12).toLocaleString(),
            'rrspsavings': (rrspTaxSavings / 12).toLocaleString(),
            'totalTax': (TOTAL_TAX / 12).toLocaleString(),
            'annual': (NET_INCOME / 12).toLocaleString()
        },
        'biweekly': {
            'income': (income / DEFAULT_ANNUAL_BI_WEEKS).toLocaleString(),
            'federal': (FEDTAX_CA / DEFAULT_ANNUAL_BI_WEEKS).toLocaleString(),
            'provincial': (PROTAX_CA / DEFAULT_ANNUAL_BI_WEEKS).toLocaleString(),
            'cpp': (cppTotal / DEFAULT_ANNUAL_BI_WEEKS).toLocaleString(),
            'ei': (eiTotal / DEFAULT_ANNUAL_BI_WEEKS).toLocaleString(),
            'rrspsavings': (rrspTaxSavings / DEFAULT_ANNUAL_BI_WEEKS).toLocaleString(),
            'totalTax': (TOTAL_TAX / DEFAULT_ANNUAL_BI_WEEKS).toLocaleString(),
            'annual': (NET_INCOME / DEFAULT_ANNUAL_BI_WEEKS).toLocaleString()
        },
        'week': {
            'income': (income / DEFAULT_ANNUAL_WEEKS).toLocaleString(),
            'federal': (FEDTAX_CA / DEFAULT_ANNUAL_WEEKS).toLocaleString(),
            'provincial': (PROTAX_CA / DEFAULT_ANNUAL_WEEKS).toLocaleString(),
            'cpp': (cppTotal / DEFAULT_ANNUAL_WEEKS).toLocaleString(),
            'ei': (eiTotal / DEFAULT_ANNUAL_WEEKS).toLocaleString(),
            'rrspsavings': (rrspTaxSavings / DEFAULT_ANNUAL_WEEKS).toLocaleString(),
            'totalTax': (TOTAL_TAX / DEFAULT_ANNUAL_WEEKS).toLocaleString(),
            'annual': (NET_INCOME / DEFAULT_ANNUAL_WEEKS).toLocaleString()
        },
        'day': {
            'income': (income / DEFAULT_ANNUAL_WORKING_DAYS).toLocaleString(),
            'federal': (FEDTAX_CA / DEFAULT_ANNUAL_WORKING_DAYS).toLocaleString(),
            'provincial': (PROTAX_CA / DEFAULT_ANNUAL_WORKING_DAYS).toLocaleString(),
            'cpp': (cppTotal / DEFAULT_ANNUAL_WORKING_DAYS).toLocaleString(),
            'ei': (eiTotal / DEFAULT_ANNUAL_WORKING_DAYS).toLocaleString(),
            'rrspsavings': (rrspTaxSavings / DEFAULT_ANNUAL_WORKING_DAYS).toLocaleString(),
            'totalTax': (TOTAL_TAX / DEFAULT_ANNUAL_WORKING_DAYS).toLocaleString(),
            'annual': (NET_INCOME / DEFAULT_ANNUAL_WORKING_DAYS).toLocaleString()
        },
        'hour': {
            'income': (income / (DEFAULT_ANNUAL_WEEKS * DEFAULT_ANNUAL_WEEKLY_HOURS)).toLocaleString(),
            'federal': (FEDTAX_CA / (DEFAULT_ANNUAL_WEEKS * DEFAULT_ANNUAL_WEEKLY_HOURS)).toLocaleString(),
            'provincial': (PROTAX_CA / (DEFAULT_ANNUAL_WEEKS * DEFAULT_ANNUAL_WEEKLY_HOURS)).toLocaleString(),
            'cpp': (cppTotal / (DEFAULT_ANNUAL_WEEKS * DEFAULT_ANNUAL_WEEKLY_HOURS)).toLocaleString(),
            'ei': (eiTotal / (DEFAULT_ANNUAL_WEEKS * DEFAULT_ANNUAL_WEEKLY_HOURS)).toLocaleString(),
            'rrspsavings': (rrspTaxSavings / (DEFAULT_ANNUAL_WEEKS * DEFAULT_ANNUAL_WEEKLY_HOURS)).toLocaleString(),
            'totalTax': (TOTAL_TAX / (DEFAULT_ANNUAL_WEEKS * DEFAULT_ANNUAL_WEEKLY_HOURS)).toLocaleString(),
            'annual': (NET_INCOME / (DEFAULT_ANNUAL_WEEKS * DEFAULT_ANNUAL_WEEKLY_HOURS)).toLocaleString()
        }
    };

    return salAfterTax;
}