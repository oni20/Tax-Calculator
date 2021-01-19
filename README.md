# Tax-Calculator
This is a Single Page Application (SPA) showing tax calculation of a single person's income based on following criteria
- Hourly rate
- Hours per week
- Working weeks in a year
- Province (Canada)

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

Checkout feature [document](https://drive.google.com/file/d/1_-W8j9YhU49u-X0lTmwTFNDK2IkwZX1V/view?usp=sharing)

### Known limitation
Right now we only support Canada.

## Technology stack
We are leveraging following application to build responsive UI
- UI
```bash
HTML5, Bootstrap 4 CSS, React/Redux, JavaScript, Next JS
```
-Module Builder
```bash
Node, NPM, Next JS
```
## Future enhancement
- Deploy project using Expo SDK to create cross platform application supporting android, iOS
- Use 3rd party API to retrieve salary market data for certain profession and compare with calculated value. 
- Also graphical representation will be used to show the comparison. We will leverage function from HighChart JS library.

## License
[MIT](https://choosealicense.com/licenses/mit/)