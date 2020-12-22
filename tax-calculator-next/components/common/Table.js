import React from 'react';

const Table = props => {
    return (
        <table className="responsive-table">
            <caption><p>{props.caption}</p></caption>
            <thead>
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
        </table>
    );
};

export default Table;
