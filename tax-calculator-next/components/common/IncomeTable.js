import React from 'react';
import { Table } from 'react-bootstrap';

const IncomeTable = props => {
    return (
        <Table striped bordered hover responsive>
            <caption>{props.caption}</caption>
            <thead className="green">
                <tr>
                    {Object.keys(props.theader).map((head, index) => {
                        return <th key={index}>{props.theader[head]}</th>
                    })}
                </tr>
            </thead>

            <tbody>
                <tr>
                    {Object.keys(props.tableBody).map((body, index) => {
                        return <td key={index}>$ {props.tableBody[body]}</td>
                    })}
                </tr>
            </tbody>
        </Table>
    );
};

export default IncomeTable;