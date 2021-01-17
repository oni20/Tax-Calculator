import React from 'react';

const IncomeTable = props => {
    return (
        <>
            <h3 className="income__caption">{props.caption}</h3>
            <div className="income__container d-flex justify-content-between" >
                <div className="income__title">
                    {Object.keys(props.theader).map((head, index) => {
                        return (
                            (head === "hourly")
                                ? props.isShowHourly && <p key={index}>{props.theader[head]}</p>
                                : <p key={index}>{props.theader[head]}</p>
                        )
                    })}
                </div>
                <div>
                    {Object.keys(props.tableBody).map((body, index) => {
                        return (
                            (body === "hourly")
                                ? props.isShowHourly && <p className="income__amount" key={index}>$ {props.tableBody[body]}</p>
                                : <p className="income__amount" key={index}>$ {props.tableBody[body]}</p>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default IncomeTable;