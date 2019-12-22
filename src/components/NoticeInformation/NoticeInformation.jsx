import React, { Component, Fragment } from 'react';
import { Card } from '../Card/Card';
import TextField from '../TextField/TextField';
import { Table } from 'react-bootstrap';

export class NoticeInformation extends Component {
  render() {
    const notice = this.props.noticeJSON;
    const today = new Date();

    return (
      <div>
        <Card
          title={notice.protocol}
          content={
            <Fragment>
              <p className='pull-right'>
                <i>
                  <u>{notice.protocol}</u>/{today.getFullYear()}
                </i>
              </p>
              <div className='margin-top'>
                <b className='text-center center-block'>{notice.description}</b>
                <b className='text-center center-block margin-top'>
                  IL DIRETTORE
                </b>
                {notice.articles.map(current => {
                  return (
                    <Fragment>
                      <b style={{ margin: '10px' }}>{current.initial}</b>
                      <p style={{ display: 'inline' }}>{current.text}</p>
                      <br></br>
                    </Fragment>
                  );
                })}
              </div>
              <div className='margin-top'>
                <b className='text-center center-block margin-top'>DECRETA</b>
                <TextField
                  heading='Oggetto del bando'
                  text={notice.notice_subject}
                />
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Codice</th>
                      <th>Descrizione</th>
                      <th>Numero di ore</th>
                      <th>Compenso orario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notice.assignments.map(el => {
                      return (
                        <tr>
                          <td>{el.code}</td>
                          <td>{el.activity_description}</td>
                          <td>{el.total_number_hours}</td>
                          <td>{el.hourly_cost}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <TextField
                  heading='Requisiti di ammissione'
                  text={notice.admission_requirements}
                />
                <TextField
                  heading='Come partecipare'
                  text={notice.how_to_submit_applications}
                />
                <TextField heading='Selezione' text={notice.selection_board} />
                <TextField
                  heading="Accettazione dell'incarico"
                  text={notice.acceptance}
                />
                <TextField
                  heading='Incompatibilità'
                  text={notice.incompatibility}
                />
                <TextField
                  heading="Termine dell'incarico"
                  text={notice.termination_of_the_assignment}
                />
                <TextField
                  heading="Natura dell'incarico"
                  text={notice.nature_of_the_assignment}
                />
                <TextField
                  heading='Fondi inutilizzati'
                  text={notice.unused_funds}
                />
                <h2>Criteri di Valutazione</h2>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Punteggio massimo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notice.evaluation_criterions.map(el => {
                      return (
                        <tr>
                          <td>{el.name}</td>
                          <td>{el.maxScore}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Fragment>
          }
        />
      </div>
    );
  }
}

export default NoticeInformation;
