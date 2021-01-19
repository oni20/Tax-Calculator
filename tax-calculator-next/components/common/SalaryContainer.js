import React from 'react';
import CardUpStyles from '../../styles/CardUp.module.scss';

const SalaryContainer = props => {
    return (
        <>
            <h3 className={CardUpStyles.income__caption}>{props.caption}</h3>
            <div className={`${CardUpStyles.income__container} d-flex justify-content-between`}>
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
                                ? props.isShowHourly && <p className={CardUpStyles.income__amount} key={index}>$ {props.tableBody[body]}</p>
                                : <p className={CardUpStyles.income__amount} key={index}>$ {props.tableBody[body]}</p>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default SalaryContainer;