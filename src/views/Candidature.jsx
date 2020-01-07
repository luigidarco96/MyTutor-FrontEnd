import React, { Component } from "react";
import { Grid, Row, Table, Col, Button, Modal } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import axios from "axios";
import Upload from "../components/UploadDocuments/Upload";


class Candidature extends Component {
    constructor(props) {
        super(props);
    }


    state = {
        header: [],
        candidatures: [],
        show: false,
    }
    componentDidMount() {
        this.setState({
            header: ['Studente', 'Protocollo', 'Ultima modifica', 'Stato', 'Modifica']
        });

        const headers = {
            'Authorization': localStorage.getItem('token'),
        }
        axios
            .get('http://localhost:3001/api/candidatures', { headers: headers })
            .then(blob => {
                console.log(blob.data);
                this.setState({
                    candidatures: blob.data.candidatures,
                })
            });
    }
    render() {

        let updateButton = (element) => {
            if (element.state === 'Editable')
                return (
                    <Button onClick={() => { window.open('http://localhost:3000/student/modificaCandidatura/' + element.notice_protocol, '_blank') }} style={{ border: '1px solid #274F77' }} className='buttonHover' bsStyle="primary" bsSize="xs">
                        Modifica documenti
                    </Button>
                )
            else
                return (
                    <Button disabled={true} onClick='' style={{ border: '1px solid #274F77' }} bsStyle="primary" bsSize="xs">
                        Modifica documenti
                    </Button>
                )
        }
        let statusCandidature = (status) => {
            switch (status) {
                case 'Editable':
                    return (
                        <img style={{ paddingLeft: '10px', height: '16px' }} src='/assets/images/statusCandidatureEditable.png' />
                    )
                case 'In Evaluation':
                    return (
                        <img style={{ paddingLeft: '10px', height: '16px' }} src='/assets/images/statusCandidatureInEvaluation.png' />
                    )

                case 'Rejected':
                    return (
                        <img style={{ paddingLeft: '10px', height: '16px' }} src='/assets/images/statusCandidatureRejected.png' />
                    )
                case 'In Graded List':
                    return (
                        <img style={{ paddingLeft: '10px', height: '16px' }} src='/assets/images/statusCandidatureGradList.png' />
                    )
            }
        }
        const { header, candidatures } = this.state;
        if (window.location.pathname === '/admin/candidatures') {
            return (
                <div>Ciao</div>
            )
        }
        else {
            return (
                <div className='content'>
                    <Grid fluid>
                        <Row>
                            <Col md={12}>
                                <Card
                                    title='Candidature'
                                    ctTableFullWidth
                                    ctTableResponsive
                                    content={
                                        <Table hover>
                                            <thead>
                                                <tr>
                                                    {header.map((prop, key) => {
                                                        return <th style={{ paddingLeft: '40px' }} key={key}>{prop}</th>;
                                                    })}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {candidatures &&
                                                    candidatures.map(element => {
                                                        return (
                                                            <tr
                                                                key={element.last_edit}

                                                            >
                                                                <td>{element.student}</td>
                                                                <td style={{ paddingLeft: '35px' }}>{element.notice_protocol}</td>
                                                                <td style={{ paddingLeft: '50px' }}>{element.last_edit.split("T")[0]}</td>
                                                                <td style={{ paddingLeft: '40px' }}>{statusCandidature(element.state)}</td>
                                                                <td>{updateButton(element)}</td>


                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>

                                        </Table>

                                    }>

                                </Card>

                            </Col>
                        </Row>
                        <p>Legenda:</p>
                        <div>
                            <img style={{ paddingLeft: '10px', height: '16px' }} src='/assets/images/statusCandidatureRejected.png' />
                            Candidatura rifiutata
                </div>

                        <div>
                            <img style={{ paddingLeft: '10px', height: '16px' }} src='/assets/images/statusCandidatureEditable.png' />
                            Candidatura modificabile
                </div>
                        <div>
                            <img style={{ paddingLeft: '10px', height: '16px' }} src='/assets/images/statusCandidatureInEvaluation.png' />
                            Candidatura in valutazione
                </div>
                        <div>
                            <img style={{ paddingLeft: '10px', height: '16px' }} src='/assets/images/statusCandidatureGradList.png' />
                            La graduatoria per la candidatura è stata pubblicata
                </div>


                    </Grid>


                </div>

            )
        }
    };

}

export default Candidature;
