import React, { createContext, useState, useMemo } from 'react';

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
        });

    const setSalaryStatus = (salBeforeTax, salAfterTax) => {
        setSalBeforeTax(salBeforeTax);
        setSalAfterTax(salAfterTax);
    };

    const memoizedSalBeforeTax = useMemo(() => [salBeforeTax, setSalBeforeTax], [salBeforeTax]);
    const memoizedSalAfterTax = useMemo(() => [salAfterTax, setSalAfterTax], [salAfterTax]);

    const contextValue = {
        salBeforeTax: memoizedSalBeforeTax[0],
        salAfterTax: memoizedSalAfterTax[0],
        setSalaryStatus
    };

    return (
        <ResultContext.Provider value={contextValue}>
            { children}
        </ResultContext.Provider>
    );
};

export default ResultContextProvider;