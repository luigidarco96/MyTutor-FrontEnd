import React, { Component, Fragment } from 'react';
import { Card } from '../Card/Card';

export class NoticeInformation extends Component {
  render() {
    const today = new Date();
    this.state = { date: today.getFullYear() };
    const { notice } = this.props;
    var { articles, evaluation_criterions, assignments } = notice;
    console.log(articles);
    console.log(evaluation_criterions);
    console.log(assignments);

    console.log(notice);
    return (
      <div>
        <Card
          title={notice.name}
          content={
            <Fragment>
              <p className='pull-right'>
                Rep. n:{' '}
                <i>
                  <u>{notice.n_rep}</u>/{this.state.date}
                </i>
              </p>
              <div className='margin-top'>
                <b className='text-center center-block'>{notice.description}</b>
                <b className='text-center center-block margin-top'>
                  IL DIRETTORE
                </b>
                {notice.notifications.map(current => {
                  return (
                    <Fragment>
                      <b style={{ margin: '10px' }}>{current.title}</b>
                      <p style={{ display: 'inline' }}>{current.body}</p>
                      <br></br>
                    </Fragment>
                  );
                })}
              </div>
              {notice.articles.map(current => {
                return (
                  <Fragment>
                    <u>
                      <b>
                        <h4
                          style={{ paddingLeft: '10px', paddingRight: '10px' }}
                        >
                          {current.title}
                        </h4>
                      </b>
                    </u>
                    <i style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                      {current.content}
                    </i>
                  </Fragment>
                );
              })}
              <p className='margin-top'>{notice.retification}</p>
              <u>
                <b>
                  <h4
                    className='margin-top'
                    style={{ paddingLeft: '10px', paddingRight: '10px' }}
                  >
                    TRATTAMENTO DEI DATI PERSONALI
                  </h4>
                </b>
              </u>
              <p style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                {notice.personal_data_treatment}
              </p>
            </Fragment>
          }
        />
      </div>
    );
  }
}

export default NoticeInformation;
