import React, { useContext } from 'react';

/* React Bootstrap */
import { Col, Tab, Row, Nav } from 'react-bootstrap';

/* Custom component */
import SalaryContainer from '../common/SalaryContainer';
import CardUp from '../common/CardUp';
import { GlobalContext } from '../Context/GlobalContext';
import { ResultContext } from './ResultContext';

/* Styling */
import BodyStyle from './body.module.scss';

const ResultCard =(props)=> {
  const { content } = useContext(GlobalContext),
    { salBeforeTax, salAfterTax } = useContext(ResultContext),
    { resultTable, resultTitle } = content.body; 

  return (
    <CardUp cardTitle={resultTitle} cardAssent={BodyStyle.card_up__color__beige}>
      {/* <Tab.Container id="left-tabs-example" defaultActiveKey={resultTable.headers.annual}>
        <Row>
          <Col sm={4}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey={resultTable.headers.annual}>{resultTable.headers.annual}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={resultTable.headers.monthly}>{resultTable.headers.monthly}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={resultTable.headers.biWeekly}>{resultTable.headers.biWeekly}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={resultTable.headers.weekly}>{resultTable.headers.weekly}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={resultTable.headers.hourly}>{resultTable.headers.hourly}</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey={resultTable.headers.annual}>
                <div className={BodyStyle.salary_container}>
                  <div className={`${BodyStyle.salary_line} ${BodyStyle.highlight}`}>
                    <div>Salary</div>
                    <div>$ 65,000</div>
                  </div>
                  <div className={BodyStyle.salary_line}>
                    <div>Federal Tax deduction</div>
                    <div>$ 7,922</div>
                  </div>
                  <div className={BodyStyle.salary_line}>
                    <div>Provincial Tax deduction</div>
                    <div>$ 3,979</div>
                  </div>
                  <div className={BodyStyle.salary_line}>
                    <div>CPP deduction</div>
                    <div>$ 2,898</div>
                  </div>
                  <div className={BodyStyle.salary_line}>
                    <div>EI deduction</div>
                    <div>$ 7,922</div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey={resultTable.headers.monthly}>
                asjkdhkasjd kajsdkasdksa khasdhj
              </Tab.Pane>
              <Tab.Pane eventKey={resultTable.headers.biWeekly}>
                asjkdhkasjd kajsdkasdksa khasdhj
              </Tab.Pane>
              <Tab.Pane eventKey={resultTable.headers.weekly}>
                asjkdhkasjd kajsdkasdksa khasdhj
              </Tab.Pane>
              <Tab.Pane eventKey={resultTable.headers.hourly}>
                asjkdhkasjd kajsdkasdksa khasdhj
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container> */}

      <Row>
        <Col xs={12}>
          <SalaryContainer
            caption={resultTable.beforeTaxCaption}
            theader={resultTable.headers}
            tableBody={salBeforeTax}
            isShowHourly={props.isEmploymentIncomeQuery === '' ? false : props.isEmploymentIncomeQuery}
          />
        </Col>
        <Col>
          <SalaryContainer
            caption={resultTable.afterTaxCaption}
            theader={resultTable.headers}
            tableBody={salAfterTax}
            isShowHourly={props.isEmploymentIncomeQuery === '' ? false : props.isEmploymentIncomeQuery}
          />
        </Col>
      </Row>
    </CardUp>
  );
};

export default ResultCard;
