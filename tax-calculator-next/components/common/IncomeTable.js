import React from 'react';
import { Table } from 'react-bootstrap';

const IncomeTable = props => {
    return (
        <Table striped bordered hover responsive>
            <caption>{props.caption}</caption>
            <thead className="green">
                <tr>
                    {Object.keys(props.theader).map((head, index) => {
                        return (
                            (head === "hourly")
                                ? props.isShowHourly && <th key={index}>{props.theader[head]}</th>
                                : <th key={index}>{props.theader[head]}</th>
                        )
                    })}
                </tr>
            </thead>

            <tbody>
                <tr>
                    {Object.keys(props.tableBody).map((body, index) => {
                        return (
                            (body === "hourly")
                                ? props.isShowHourly && <td key={index}>$ {props.tableBody[body]}</td>
                                : <td key={index}>$ {props.tableBody[body]}</td>)
                    })}
                </tr>
            </tbody>
        </Table>
    );
};

export default IncomeTable;