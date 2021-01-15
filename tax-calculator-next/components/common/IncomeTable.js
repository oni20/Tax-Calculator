import React from 'react';

const IncomeTable = props => {
    return (
        <React.Fragment>
        <h3 className="income__caption">{props.caption}</h3>
        <div className = "income__container d-flex justify-content-between" > 
            <div className="income__title">
              {Object.keys(props.theader).map((head, index) => {
                return <p key={index}>{props.theader[head]}</p>
              })}
            </div>
            <div>
              {Object.keys(props.tableBody).map((body, index) => {
                return <p className="income__amount" key={index}>$ {props.tableBody[body]}</p>
              })}
            </div>
        </div>
        </React.Fragment>
    );
};

export default IncomeTable;