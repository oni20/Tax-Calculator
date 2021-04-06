import React from 'react';
import SalaryContainerStyles from './salarycontainer.module.scss';

const SalaryContainer = props => {
    const { display, caption, theader, tableBody } = props,
        styleClass = display ? display : '';

    return (
        <>
            <div className={styleClass}>
                <h3 className={SalaryContainerStyles.income__caption}>{caption}</h3>
                < div className={
                    `${SalaryContainerStyles.income__container} d-flex justify-content-between`
                } >
                    <div className='income__title'>
                        {Object.keys(theader).map((head, index) => {
                            return (
                                <p key={index}
                                    className={head === 'annual'
                                        ? SalaryContainerStyles.net__income
                                        : (head === 'income' || head === 'totalTax')
                                            ? SalaryContainerStyles.gross__income
                                            : ''}>
                                    {theader[head]}
                                </p>
                            );
                        })}
                    </div>
                    <div>
                        {Object.keys(tableBody).map((body, index) => {
                            return (
                                <p
                                    key={index}
                                    className={`${SalaryContainerStyles.income__amount} ${body === 'annual'
                                        ? SalaryContainerStyles.net__income
                                        : (body === 'income' || body === 'totalTax')
                                            ? SalaryContainerStyles.gross__income
                                            : ''} `} >
                                    {['income', 'annual', 'rrspsavings'].indexOf(body) > -1 ? '' : '-'} {body === 'rrspsavings' ? '+' : ''} $ {tableBody[body]}
                                </p>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SalaryContainer;