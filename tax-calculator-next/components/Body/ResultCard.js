import React, { useState, useContext } from 'react';

/* React Bootstrap */
import { Col } from 'react-bootstrap';

/* Custom component */
import SalaryContainer from '../common/SalaryContainer';
import CardUp from '../common/CardUp';
import { GlobalContext } from '../Context/GlobalContext';
import { ResultContext } from './ResultContext';

/* Styling */
import BodyStyle from './body.module.scss';

const ResultCard = (props) => {
  const { content } = useContext(GlobalContext),
    { salBeforeTax, salAfterTax } = useContext(ResultContext);

  return (
    <CardUp cardTitle={content.body.resultTitle} cardAssent={BodyStyle.card_up__color__beige}>
      <Col xs={12}>
        {/* Before tax */}
        <SalaryContainer
          caption={content.body.resultTable.beforeTaxCaption}
          theader={content.body.resultTable.headers}
          tableBody={salBeforeTax}
          //{props.resultSetBeforeTax}
          isShowHourly={props.isEmploymentIncomeQuery === "" ? false : props.isEmploymentIncomeQuery}
        />
      </Col>
      <Col>
        {/* After tax */}
        <SalaryContainer
          caption={content.body.resultTable.afterTaxCaption}
          theader={content.body.resultTable.headers}
          tableBody={salAfterTax}
          //{props.resultSetAfterTax}
          isShowHourly={props.isEmploymentIncomeQuery === "" ? false : props.isEmploymentIncomeQuery}
        />
      </Col>
    </CardUp>
  );
}

export default ResultCard;
