import React from 'react';
import BodyStyle from '../Body/body.module.scss';

const CardUp = props => {
    return (
        <div className={`${props.cardAssent} ${BodyStyle.card_up}`}>
            <h2 className="text-center font-weight-bold heading__h2 mb-5" > {props.cardTitle}</h2>
            {props.children}
        </div>
    )
};

export default CardUp;