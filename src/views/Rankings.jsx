
import React, { Component } from "react";
import { Grid, Row, Table, Col, Button, Modal } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import axios from "axios";
import Upload from "../components/UploadDocuments/Upload";
import { StateNoticeDictionary } from "../static/dicts.js"


class Rankings extends Component {
    constructor(props) {
        super(props);
    }


    state = {
        header: [],
        notices: [],
    }
    componentDidMount() {
        //Set the header of the table.
        this.setState({
            header: ['Protocollo', 'Stato', 'Carica graduatoria', 'Scarica graduatoria'],
        });
        //Set the headers for the authantication
        const headers = {
            'Authorization': localStorage.getItem('token'),
        }
        //Call to search the notices with state 'waiting for graded list'.
        axios
            .post('http://localhost:3001/api/notices/search', { state: 'Waiting for Graded List' }, { headers: headers })
            .then(blob => {
                console.log(blob.data);
                this.setState({
                    notices: blob.data.notices,
                })
            })
    }

    render() {
        //Posso riutilizzare i bottoni
        let downoladDocuments = (element) => {
            if (element.state === 'In Evaluation') {

                return (
                    <Button
                        style={{ border: '1px solid #274F77' }}
                        className='buttonHover'
                        bsStyle="primary"
                        bsSize="xs"
                        onClick={() => {
                            const headers = {
                                'Authorization': localStorage.getItem('token'),
                            }
                            const candidature = {
                                candidature: element,

                            }
                            //Call servise to downnload documents of a candidature
                            axios
                                .post('http://localhost:3001/api/candidatures/all', candidature, { headers: headers, responseType: 'blob' })
                                .then(blob => {
                                    const fileName = blob.headers['content-disposition'].split(';')[1].trim().split('"')[1];
                                    let a = document.createElement('a');
                                    var url = window.URL.createObjectURL(blob.data);
                                    a.href = url;
                                    a.download = fileName;
                                    a.click();
                                    window.URL.revokeObjectURL(url);
                                    a.remove();

                                })
                        }}


                    >
                        Scarica documenti
                    </Button>
                )
            }
            else {
                return (
                    <Button
                        disabled={true}
                        style={{ border: '1px solid #274F77' }}
                        className='buttonHover'
                        bsStyle="primary"
                        bsSize="xs"
                        onClick={() => {
                            const headers = {
                                'Authorization': localStorage.getItem('token'),
                            }
                            const candidature = {
                                candidature: element,

                            }
                            //Call servise to downnload documents of a candidature
                            axios
                                .post('http://localhost:3001/api/candidatures/all', candidature, { headers: headers, responseType: 'blob' })
                                .then(blob => {
                                    const fileName = blob.headers['content-disposition'].split(';')[1].trim().split('"')[1];
                                    let a = document.createElement('a');
                                    var url = window.URL.createObjectURL(blob.data);
                                    a.href = url;
                                    a.download = fileName;
                                    a.click();
                                    window.URL.revokeObjectURL(url);
                                    a.remove();

                                })
                        }}
                    >
                        Scarica documenti
                    </Button>
                )
            }
        }
        const { header, notices } = this.state;

        return (
            <div className='content'>
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title='Graduatorie'
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table hover>
                                        <thead >
                                            <tr style={{ marginLeft: '115px' }}>
                                                {header.map((prop, key) => {
                                                    return <th style={{ paddingLeft: '40px', paddingRight: '20px' }} key={key}>{prop}</th>;
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {notices &&
                                                notices.map(element => {
                                                    return (
                                                        <tr
                                                            key={element.notice_protocol}

                                                        >
                                                            {
                                                                //Controllare i campi da inserire nella tabella
                                                            }
                                                            <td style={{ paddingLeft: '27px', paddingRight: '0px' }}>{element.protocol}</td>
                                                            <td style={{ paddingLeft: '0px' }}>{StateNoticeDictionary[element.state]}</td>
                                                            <td style={{paddingLeft:'42px'}}>

                                                                <Button
                                                                    style={{ border: '1px solid #274F77' }}
                                                                    className='buttonHover'
                                                                    bsStyle="primary"
                                                                    bsSize="xs"
                                                                    onClick={() => {
                                                                        const headers = {
                                                                            'Authorization': localStorage.getItem('token'),
                                                                        }
                                                                        const candidature = {
                                                                            candidature: element,

                                                                        }
                                                                        //Call servise to downnload ranking
                                                                        /*
                                                                        axios
                                                                            .post('http://localhost:3001/api/candidatures/all', candidature, { headers: headers, responseType: 'blob' })
                                                                            .then(blob => {
                                                                                const fileName = blob.headers['content-disposition'].split(';')[1].trim().split('"')[1];
                                                                                let a = document.createElement('a');
                                                                                var url = window.URL.createObjectURL(blob.data);
                                                                                a.href = url;
                                                                                a.download = fileName;
                                                                                a.click();
                                                                                window.URL.revokeObjectURL(url);
                                                                                a.remove();

                                                                            })
                                                                            */
                                                                    }}


                                                                >
                                                                    Carica graduatoria
                                                                 </Button>


                                                            </td>
                                                            <td style={{paddingLeft:'42px'}}>
                                                                <Button
                                                                    style={{ border: '1px solid #274F77' }}
                                                                    className='buttonHover'
                                                                    bsStyle="primary"
                                                                    bsSize="xs"
                                                                    onClick={() => {
                                                                        const headers = {
                                                                            'Authorization': localStorage.getItem('token'),
                                                                        }
                                                                        const candidature = {
                                                                            candidature: element,

                                                                        }
                                                                        //Call servise to downnload documents of a candidature
                                                                        /*
                                                                        axios
                                                                            .post('http://localhost:3001/api/candidatures/all', candidature, { headers: headers, responseType: 'blob' })
                                                                            .then(blob => {
                                                                                const fileName = blob.headers['content-disposition'].split(';')[1].trim().split('"')[1];
                                                                                let a = document.createElement('a');
                                                                                var url = window.URL.createObjectURL(blob.data);
                                                                                a.href = url;
                                                                                a.download = fileName;
                                                                                a.click();
                                                                                window.URL.revokeObjectURL(url);
                                                                                a.remove();

                                                                            })
                                                                            */
                                                                    }}


                                                                >
                                                                    Scarica graduatoria
                    </Button>
                                                            </td>


                                                        </tr>
                                                    );
                                                })}
                                        </tbody>

                                    </Table>
                                }>
                            </Card>

                        </Col>
                    </Row>
                </Grid>


            </div>
        )
    };

}

export default Rankings;