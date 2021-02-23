import React, { createContext, useState } from 'react';

export const ResultContext = createContext();

const ResultContextProvider = ({ children }) => {
    const [salBeforeTax, setSalBeforeTax] = useState({
        'annual': 0,
        'monthly': 0,
        'biWeekly': 0,
        'weekly': 0,
        'hourly': 0
    }),
        [salAfterTax, setSalAfterTax] = useState({
            'annual': 0,
            'monthly': 0,
            'biWeekly': 0,
            'weekly': 0,
            'hourly': 0
        }),
        setSalaryStatus = (salBeforeTax, salAfterTax) => {
            setSalBeforeTax(salBeforeTax);
            setSalAfterTax(salAfterTax);
        },
        contextValue = { salBeforeTax, salAfterTax, setSalaryStatus };

    return (
        <ResultContext.Provider value={contextValue}>
            { children}
        </ResultContext.Provider>
    );
};

export default ResultContextProvider;