import React, { Component } from 'react';

import { Grid, Row, Col, Table } from "react-bootstrap";    
import Card from "components/Card/Card.jsx";
import { notices } from "../static/notices";

class Notices extends Component {

    state = {
        header: [],
        content: [],
    }
    constructor(props) {
        super(props);
        this.getDetailNotice = this.getDetailNotice.bind(this);
      }
    componentDidMount() {
        this.setState({
            header: [
                "id",
                "nome",
                "datascadenza",
                "graduatoria",
                "stato"
            ]
        });
    }
   
    getDetailNotice = (e) => {
        let pathname = this.props.location.pathname;
        let path = "http://localhost:3000/";
        path = path.concat(pathname.split("/")[1]+"/detailNotices/"+e.id);
        window.location.replace(path);
       
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
                                                
                                                   <tr onClick={()=>this.getDetailNotice(element)}>
                                                        
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