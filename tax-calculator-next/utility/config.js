/* Define input type as object here in config file and get the key name from Dictionary
to keep translation mechanism working */

export const DEFAULT_ANNUAL_WEEKS = 52,
    DEFAULT_ANNUAL_BI_WEEKS = 26,
    DEFAULT_ANNUAL_WEEKLY_HOURS = 40,
    InputControlList = [
        {
            "controlId": "formEmpIncome",
            "iconName": "monetization_on",
            "labelKeyName": "employmentIncomeLabel",
            "isRequired": true,
            "isEmploymentIncomeQuery": true
        },
        {
            "controlId": "formEmpIncomeHourly",
            "iconName": "hourglass_top",
            "labelKeyName": "workingHoursInWeekLabel",
            "isEmploymentIncomeQuery": true,
            "errorMessageKeyName": "missingWeeklyHours",
            "isRequired": true,
            "rangeMax": "40"
        },
        {
            "controlId": "formSelfIncomeHourlyRate",
            "iconName": "monetization_on",
            "labelKeyName": "hourlyRateLabel",
            "isEmploymentIncomeQuery": false,
            "errorMessageKeyName": "missingHourlyRate",
            "isRequired": true,
            "rangeMax": "1000"
        },
        {
            "controlId": "formSelfIncomeWorkingWeeklyHour",
            "iconName": "hourglass_top",
            "labelKeyName": "workingHoursInWeekLabel",
            "isEmploymentIncomeQuery": false,
            "errorMessageKeyName": "missingWeeklyHours",
            "isRequired": true,
            "rangeMax": "40"
        },
        {
            "controlId": "formSelfIncomeWorkingWeekAnnual",
            "iconName": "date_range",
            "labelKeyName": "totalWorkingWeeksInAYear",
            "isEmploymentIncomeQuery": false,
            "errorMessageKeyName": "missingAnnualWeeks",
            "isRequired": true,
            "rangeMax": "52"
        }
    ];
