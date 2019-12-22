import React, { Component, Fragment } from 'react';
import NoticeInformation from '../components/NoticeInformation/NoticeInformation';
import Upload from '../components/UploadDocuments/Upload';
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
    fetch(`http://localhost:3001/api/notices/${params.id}`)
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
    const {
      noticeJSON: { notice },
      isLoaded
    } = this.state;

    if (isLoaded && notice) {
      console.log(notice);
      var { articles, evaluation_criterions, assignments } = notice;

      return (
        <Grid style={{ margin: '20px 0' }} fluid>
          <Row>
            <Col xs={10}>
              <NoticeInformation noticeJSON={notice} />
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
    } else {
      return <h1>Caricamento...</h1>;
    }
  }
}

export default DetailsNotice;
