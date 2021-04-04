/* Define input type as object here in config file and get the key name from Dictionary
to keep translation mechanism working */

export const DEFAULT_ANNUAL_WEEKS = 52,
    DEFAULT_ANNUAL_BI_WEEKS = 26,
    DEFAULT_ANNUAL_WORKING_DAYS = 260,
    DEFAULT_ANNUAL_WEEKLY_HOURS = 40,
    ERROR_IMAGE_LOTTIE = 'https://assets3.lottiefiles.com/packages/lf20_tolzoh5a.json',
    DEFAULT_SALARY_STATUS = {
        'year': {
            'income': 0,
            'federal': 0,
            'provincial': 0,
            'cpp': 0,
            'ei': 0,
            'rrspsavings': 0,
            'totalTax':0,
            'annual': 0
        },
        'month': {
            'income': 0,
            'federal': 0,
            'provincial': 0,
            'cpp': 0,
            'ei': 0,
            'rrspsavings': 0,
            'totalTax':0,
            'annual': 0
        },
        'biweekly': {
            'income': 0,
            'federal': 0,
            'provincial': 0,
            'cpp': 0,
            'ei': 0,
            'rrspsavings': 0,
            'totalTax':0,
            'annual': 0
        },
        'week': {
            'income': 0,
            'federal': 0,
            'provincial': 0,
            'cpp': 0,
            'ei': 0,
            'rrspsavings': 0,
            'totalTax':0,
            'annual': 0
        },
        'day': {
            'income': 0,
            'federal': 0,
            'provincial': 0,
            'cpp': 0,
            'ei': 0,
            'rrspsavings': 0,
            'totalTax':0,
            'annual': 0
        },
        'hour': {
            'income': 0,
            'federal': 0,
            'provincial': 0,
            'cpp': 0,
            'ei': 0,
            'rrspsavings': 0,
            'totalTax':0,
            'annual': 0
        }
    },
    InputControlList = [
        {
            "controlId": "formEmpIncome",
            "iconName": "monetization_on",
            "labelKeyName": "employmentIncomeLabel",
            "isRequired": true,
            "isEmploymentIncomeQuery": 'personalIncome'
        },
        {
            "controlId": "formEmpIncomeRRSP",
            "iconName": "savings",
            "labelKeyName": "RRSPLabel",
            "isEmploymentIncomeQuery": 'personalIncome',
            "errorMessageKeyName": "missingWeeklyHours",
            "isRequired": false,
        },
        {
            "controlId": "formSelfIncomeHourlyRate",
            "iconName": "monetization_on",
            "labelKeyName": "hourlyRateLabel",
            "isEmploymentIncomeQuery": 'selfIncome',
            "errorMessageKeyName": "missingHourlyRate",
            "isRequired": true,
            "rangeMax": "1000"
        },
        {
            "controlId": "formSelfIncomeWorkingWeeklyHour",
            "iconName": "hourglass_top",
            "labelKeyName": "workingHoursInWeekLabel",
            "isEmploymentIncomeQuery": 'selfIncome',
            "errorMessageKeyName": "missingWeeklyHours",
            "isRequired": true,
            "rangeMax": "40"
        },
        {
            "controlId": "formSelfIncomeWorkingWeekAnnual",
            "iconName": "date_range",
            "labelKeyName": "totalWorkingWeeksInAYear",
            "isEmploymentIncomeQuery": 'selfIncome',
            "errorMessageKeyName": "missingAnnualWeeks",
            "isRequired": true,
            "rangeMax": "52"
        }
    ];
