import React, { createContext, useState, useMemo } from 'react';

export const ResultContext = createContext();

const ResultContextProvider = ({ children }) => {
    const [salBeforeTax, setSalBeforeTax] = useState({
        'income': 0,
        'federal': 0,
        'provincial': 0,
        'cpp': 0,
        'ei': 0,
        'annual': 0
    }),
        [salAfterTax, setSalAfterTax] = useState({
            'income': 0,
            'federal': 0,
            'provincial': 0,
            'cpp': 0,
            'ei': 0,
            'rrspsavings': 0,
            'annual': 0
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