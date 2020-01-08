import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { StateAssignmentDictionary } from "../../static/dicts";

export default class TypedAssignments extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type, assignments } = this.props;
    console.log("Ciaooooooooooo");
    return (
      <div>
        <Table key={type} striped bordered hover>
          <thead>
            <tr>
              <th>N.</th>
              <th>Protocollo</th>
              <th>Codice</th>
              <th>Descrizione</th>
              <th>Stato</th>
              <th>Azione</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((element, index) => {
              return (
                <tr
                  id={element.protocol}
                  key={element.protocol}
                  onClick={e => e.preventDefault()}
                >
                  <td>{index}</td>
                  <td>{element.notice_protocol}</td>
                  <td>{element.code}</td>
                  <td>{element.activity_description}</td>
                  <td>{StateAssignmentDictionary[element.state]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
