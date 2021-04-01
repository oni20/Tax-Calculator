import React, { createContext, useState, useMemo } from 'react';
import { DEFAULT_SALARY_STATUS } from '../../utility/config';

export const ResultContext = createContext();

const ResultContextProvider = ({ children }) => {
    const [salAfterTax, setSalAfterTax] = useState(DEFAULT_SALARY_STATUS);

    const setSalaryStatus = (salAfterTax) => {
        setSalAfterTax(salAfterTax);
    };

    const memoizedSalAfterTax = useMemo(() => [salAfterTax, setSalAfterTax], [salAfterTax]);

    const contextValue = {
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