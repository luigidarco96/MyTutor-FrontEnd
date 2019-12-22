import React, { Component, Fragment } from 'react';
import NoticeInformation from '../components/NoticeInformation/NoticeInformation';
import Upload from '../components/UploadDocuments/Upload';
import notice from '../static/notice';
import { Col, Row, Grid } from 'react-bootstrap';
import CustomButton from '../components/CustomButton/CustomButton';

class DetailsNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      noticeJSON: {}
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    //Fetch file notice.json from Back-end github project
    fetch(`localhost:3001/api/notices/${params.id}`)
      //Transform response text in json object
      .then(blob => blob.json())
      //set the json object in the state
      .then(
        result => {
          this.setState({
            isLoaded: true,
            noticeJSON: result
          });
        },
        error => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      );
  }

  render() {
    const { noticeJSON, isLoaded } = this.state;

    // TODO Change json management
    //check if the fetch of the JSON file it was successfull
    if (isLoaded) {
      //fill the notice object with the field of the JSON object
      notice['director'] = noticeJSON.director;
      notice['decrees'] = noticeJSON.decrees;
      notice['ratification'] = noticeJSON.ratification;
      notice['personal_data_treatment'] = noticeJSON.personal_data_treatment;

      //recovery of the articles form JSON object
      var articlesJSON = this.state.noticeJSON;
      for (var obj in articlesJSON) {
        //check if the entry of JSON object is an article
        if (obj.startsWith('art')) {
          //check if the article is not the 13th
          if (!obj.endsWith('13')) {
            //add the attribute content at the article
            articlesJSON[obj]['content'] = "Contenuto dell'articolo";
          }
          //add the articles in the notice
          notice.articles.push(articlesJSON[obj]);
        }
      }
      console.log(notice);
    }
    return (
      <Grid style={{ margin: '20px 0' }} fluid>
        <Row>
          <Col xs={10}>
            <NoticeInformation notice={notice} />
          </Col>
          <Col xs={2}>
            <CustomButton bsStyle='primary' block={true}>
              Scarica bando
            </CustomButton>
            <br></br>
            <CustomButton bsStyle='primary' block={true} disabled>
              Scarica graduatoria
            </CustomButton>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Upload />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DetailsNotice;
