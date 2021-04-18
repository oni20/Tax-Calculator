import React, { useState, useContext } from 'react';

/* React Bootstrap */
import { Col, Tab, Row, Nav } from 'react-bootstrap';

/* Custom component */
import SalaryContainer from '../common/SalaryContainer';
import CardUp from '../common/CardUp';
import { GlobalContext } from '../Context/GlobalContext';
import { ResultContext } from './ResultContext';
import PieChart from '../Chart/PieChart';

/* Styling */
import BodyStyle from './body.module.scss';

const ResultCard = (props) => {
  const [tabName, setTabName] = useState('tab-0'),
    { content } = useContext(GlobalContext),
    { salAfterTax } = useContext(ResultContext),
    { resultTable, resultTitle, tabNames } = content.body,
    { isEmploymentIncomeQuery } = props,
    tabMapper = {
      'tab-0': 'year',
      'tab-1': 'month',
      'tab-2': 'biweekly',
      'tab-3': 'week',
      'tab-4': 'hour'
    },
    salaryRate = tabMapper[tabName];

  const handleTabChange = tabName => {
    setTabName(tabName);
  };

  return (
    <CardUp cardTitle={resultTitle} cardAssent={BodyStyle.card_up__color__beige}>
      <Tab.Container
        id="salary-rate"
        defaultActiveKey="tab-0"
        activeKey={tabName}
        onSelect={handleTabChange}
      >
        <Row>
          <Col sm={12}>
            <Nav fill variant="pills" className="flex-row mb-4 justify-content-md-between justify-content-start">
              {
                tabNames.map((tab, index) => {
                  return (
                    <Nav.Item key={index}>
                      <Nav.Link eventKey={`tab-${index}`}>{tab}</Nav.Link>
                    </Nav.Item>
                  );
                })
              }
            </Nav>
          </Col>

          <Col sm={12}>
            <Tab.Content>
              {
                Object.keys(salAfterTax).map((salaryRate, index) => {
                  return (
                    <Tab.Pane key={index} eventKey={`tab-${index}`}>
                      <Row>
                        <Col xs={12}>
                          <SalaryContainer
                            caption={resultTable.afterTaxCaption}
                            theader={resultTable.headers}
                            tableBody={salAfterTax[salaryRate]}
                            isShowHourly={isEmploymentIncomeQuery === '' ? false : isEmploymentIncomeQuery}
                          />
                        </Col>
                      </Row>
                    </Tab.Pane>
                  );
                })
              }
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <Row>
        <Col>
          {salAfterTax[salaryRate].income !== 0 &&
            <PieChart salAfterTax={salAfterTax[salaryRate]} />
          }
        </Col>
      </Row>
    </CardUp>
  );
};

export default ResultCard;
