# Tax-Calculator
This is a Single Page Application (SPA) showing tax calculation of a single person's income based on following criteria
- Hourly rate
- Hours per week
- Working weeks in a year
- Province

Tax rules are leveraged from [CRA Website](https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html)

## UX link
Checkout latest [Design](https://xd.adobe.com/view/70389bcf-c86b-4d70-49a4-26169b8f5501-0609/screen/a190558d-f10c-49ec-beea-5312b044a48a/)

Password
```bash
Taxcal@2020
```

## In-scope development
We will develop
- Few form fields as Input box to collect user's salary criteria.
- A dropdown where user need to choose Province.
- A table to show result.
- Follow AA standard accessibility compliance
- Support translation (Only from English to French or vice-versa)

### Known limitation
Right now we only support Canada.

## Technology stack
We will use
- UI
```bash
HTML5, Bootstrap 4 CSS, React/Redux
```
-Module Builder
```bash
Node, NPM, WebPack
```
## Installation
1) Install node JS from their official [website](https://nodejs.org/en/)
2) Clone this repo to your local workstation
3) Navigate to root folder where package.json file exist
4) Run below command
```bash
npm start
```
## Future enhancement
- Support multiple countries and their native language
- Use 3rd party API to retrieve salary market data for certain profession and compare with calculated value. Also graphical representation will be used to show the comparison. We will leverage function from HighChart JS library.

## License
[MIT](https://choosealicense.com/licenses/mit/)