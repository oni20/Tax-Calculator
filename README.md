# Tax-Calculator
Find out what's your net income in terms of Canadian Tax bracket.
This Single Page Application (SPA) collects user information on following aspects and calculate net income from it
- Employment type
- Hourly rate
- Hours per week
- Working weeks in a year
- Working province (Canada)

Tax rules are leveraged from [CRA Website](https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html)

## Website link
Checkout latest [Go Tax](https://go-tax.ca/)

## Developer facts
This page consists of
- Few form fields as Input box to collect user's salary criteria and associated slider.
- A dropdown where user need to choose Province.
- A table to show result.
- Follow AA standard accessibility compliance
- Support mutil-language (available locales are English and French (Canada))

Checkout our feature [document](https://drive.google.com/file/d/1_-W8j9YhU49u-X0lTmwTFNDK2IkwZX1V/view?usp=sharing) for more insights

### Technology stack
We are exploring following tech stack to build responsive UI
- UI
```bash
HTML5, Bootstrap 4,  SCSS, React, React Hooks, Next JS, JavaScript
```
-Module Builder
```bash
Node, NPM, Next JS
```
### Known limitation
Right now we only support Canadian tax income.

### Future enhancement
- Bring new feature to decorate self employment income section
- Add graphical representation on salary section for visual display of gross income vs. net income
- Breakdown of tax on gross income
- Use 3rd party API to retrieve salary market data for certain profession and compare with calculated value.
- Decorated 'Contact Us' section to notify us any kind of issues.
- Allow user to create a profile and save the calculation

## License
[MIT](https://choosealicense.com/licenses/mit/)
