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