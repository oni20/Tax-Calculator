import React from 'react';
import SalaryContainerStyles from './salarycontainer.module.scss';

const SalaryContainer = props => {
    return (
        <>  
            <div className={`${props.display}`}>
            <h3 className={SalaryContainerStyles.income__caption}>{props.caption}</h3>
            < div className = {
                `${SalaryContainerStyles.income__container} d-flex justify-content-between`
            } >
                <div className='income__title'>
                    {Object.keys(props.theader).map((head, index) => {
                        return (
                            <p key={index}>{props.theader[head]}</p>
                        );     
                    })}
                </div>    
                <div>
                    {Object.keys(props.tableBody).map((body, index) => {
                        return (
                            <p className={SalaryContainerStyles.income__amount} key={index}>$ {props.tableBody[body]}</p>
                        );
                    })}
                </div>
            </div>
            </div>
        </>
    );
};    

export default SalaryContainer;