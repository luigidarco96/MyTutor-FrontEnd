import React, { Component } from 'react';

import { Grid, Row, Col, Table } from "react-bootstrap";    
import Card from "components/Card/Card.jsx";
import { notices } from "../static/notices";

class Notices extends Component {

    state = {
        header: [],
        content: [],
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                header: [
                    "id",
                    "nome",
                    "datascadenza",
                    "graduatoria",
                    "stato"
                ]
            });
        }, 10000);
    }

    render() {

        const {
            header
        } = this.state;

        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Lista Bandi"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                {header.map((prop, key) => {
                                                    return <th key={key}>{prop}</th>;
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {notices.map((element) => {
                                                return (
                                                    <tr>
                                                        {Object.keys(element).map((key) => {
                                                            return <td>{element[key]}</td>;
                                                        })}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Notices;