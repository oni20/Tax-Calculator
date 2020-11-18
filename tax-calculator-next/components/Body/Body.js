import React, { useState, useEffect } from 'react';
import Table from '../common/Table';
import Radio from '../common/Radio';

const Body = props => {
  const [provinceDDVal, setProvinceDDVal] = useState(""),
    [currentProvinceTaxRule, setCurrentProvinceTaxRule] = useState([]),
    [rangeVal, setRangeVal] = useState(0),
    [ddVal, setDDVal] = useState("");

  useEffect(() => {

  });

  const handleDDChange = event => {
    this.setState({ setDDVal: event.target.value });
  }

  const calculateTax = (event) => {
    event.preventDefault();
  }


  let dummy = {
    "annual": 50,
    "monthly": 20,
    "biWeekly": 10,
    "weekly": 5
  };

  return (
    <>
      <div className="section no-pad-bot" id="index-banner">
        <h1 className="header center orange-text">{props.bodyContent.introTitle}</h1>
        <blockquote>
          <h5>{props.bodyContent.introDesc.replace("$currYear$", new Date().getFullYear())}</h5>
        </blockquote>
      </div>

      <div className="section">
        <div className="row">
          <div className="col s12 m5">

            <form action="#">
              <div className="input-field">
                <i className="material-icons prefix">monetization_on</i>
                <input id="hourly_rate" type="text" className="validate" />
                <label htmlFor="hourly_rate">{props.bodyContent.hourlyRateLabel}</label>
              </div>

              <div className="input-field">
                <i className="material-icons prefix">hourglass_full</i>
                <input id="working_hour" type="text" className="validate" />
                <label htmlFor="working_hour">{props.bodyContent.workingHoursInWeekLabel}</label>
              </div>

              <div className="input-field">
                <i className="material-icons prefix">date_range</i>
                <input id="working_week" type="text" className="validate" />
                <label htmlFor="working_week">{props.bodyContent.totalWorkingWeeksInAYear}</label>
              </div>

              <fieldset className="input-field">
                <legend>{props.bodyContent.provinceDD}</legend>
                {
                  props.bodyContent.provinceList.map((province, index) => {
                    return (
                      <Radio
                        key={index}
                        value={province.id}
                        displayText={province.displayText}
                      />
                    )
                  })
                }
              </fieldset>

              <button type="submit" className="green waves-effect waves-light btn">
                {props.bodyContent.calculateBtn}
              </button>
            </form>
          </div>

          <div className="col s12 m7">
            <div className="row">
              <div className="col s12">
                <Table
                  caption={props.bodyContent.resultTable.beforeTaxCaption}
                  theader={props.bodyContent.resultTable.headers}
                  tableBody={dummy}
                />
              </div>
              <div className="col s12">
                <Table
                  caption={props.bodyContent.resultTable.afterTaxCaption}
                  theader={props.bodyContent.resultTable.headers}
                  tableBody={dummy}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
