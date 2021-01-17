import React from 'react';

const CardUp = props => {
    return (
        <div className={ `${props.cardAssent} card-up` }> 
        <h2 className = "text-center font-weight-bold heading__h2 mb-5" > { props.cardTitle }</h2>
        {props.children}
        </div>
    )
};

export default CardUp;