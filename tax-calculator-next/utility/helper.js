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