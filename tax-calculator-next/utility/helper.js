export const convertStringToLocale = param => {
    if (typeof (param) == "number") {
        return param.toLocaleString();
    } else {
        return convertStringToNumber(param).toLocaleString();
    }
}
export const convertStringToNumber = param => Number(param.replace(/[^0-9.-]+/g, ""));