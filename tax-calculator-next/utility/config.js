/* Define input type as object here in config file and get the key name from Dictionary
to keep translation mechanism working */

const InputControlList = [
    {
        "controlId": "formHourlyRate",
        "iconName": "monetization_on",
        "labelKeyName": "hourlyRateLabel",
        "errorMessageKeyName": "missingHourlyRate",
        "rangeMax": "1000"
    },
    {
        "controlId": "formWorkingWeeklyHour",
        "iconName": "hourglass_top",
        "labelKeyName": "workingHoursInWeekLabel",
        "errorMessageKeyName": "missingWeeklyHours",
        "rangeMax": "60"
    },
    {
        "controlId": "formWorkingWeekAnnual",
        "iconName": "date_range",
        "labelKeyName": "totalWorkingWeeksInAYear",
        "errorMessageKeyName": "missingAnnualWeeks",
        "rangeMax": "52"
    }
];

export default InputControlList;
