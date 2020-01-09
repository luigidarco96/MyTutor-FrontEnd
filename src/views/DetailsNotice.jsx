import React, { Component, Fragment } from 'react';
import NoticeInformation from '../components/NoticeInformation/NoticeInformation';
import Upload from '../components/UploadDocuments/Upload';
import { Col, Row, Grid } from 'react-bootstrap';
import CustomButton from '../components/CustomButton/CustomButton';
import Axios from 'axios';

class DetailsNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      noticeJSON: {}
    };
  }

  handleInputForm() {
    const { noticeJSON } = this.state;
    let user = JSON.parse(localStorage.getItem('user'));

    if (
      Boolean(user) &&
      user.role === 'Student' &&
      noticeJSON.state === 'Published'
    ) {
      return <Upload notice_protocol={this.props.match.params.id} />;
    }
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    let user = JSON.parse(localStorage.getItem('user'));

    if (
      user != null &&
      (user.role === 'Teaching Office' ||
        user.role === 'DDI' ||
        user.role === 'Professor')
    ) {
      Axios.get(`http://localhost:3001/api/notices/${params.id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(blob => {
        this.setState({
          isLoaded: true,
          noticeJSON: blob.data.notices[0]
        });
      });
    } else {
      Axios.get(`http://localhost:3001/api/notices/${params.id}`).then(blob => {
        this.setState({
          isLoaded: true,
          noticeJSON: blob.data.notices[0]
        });
      });
    }
  }

  render() {
    const { noticeJSON, isLoaded } = this.state;

    if (isLoaded && noticeJSON) {
      return (
        <Grid className='custom-body-view' style={{ margin: '20px 0' }} fluid>
          <Row>
            <Col xs={12} md={9}>
              <NoticeInformation noticeJSON={noticeJSON} />
            </Col>
            <Col xs={12} md={3}>
              <CustomButton 
                bsStyle='primary' 
                block={true}
                onClick={()=>{
                  const headers = {
                    'Authorization': localStorage.getItem('token'),
                  }
                  Axios
                  //Call the service to download the notice.
                  .get('http://localhost:3001/api/notices/pdf/'+this.props.match.params.id,{headers:headers, responseType: 'blob'})
                  .then(blob=>{
                    console.log(blob);
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
              
                Scarica bando
              </CustomButton>
              <br></br>
              <CustomButton
              
                bsStyle='primary'
                block={true} 
                disabled={!(this.state.noticeJSON.state==="Closed")}
                onClick = {()=>{
                  const headers ={
                    'Authorization': localStorage.getItem('token'),
                  }
                  Axios
                  .get('http://localhost:3001/api/notices/grades/pdf/' + this.state.noticeJSON.protocol, { headers: headers, responseType: 'blob' })
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
                Scarica graduatoria
              </CustomButton>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>{this.handleInputForm()}</Col>
          </Row>
        </Grid>
      );
    } else {
      return (
        <div className='container-fluid'>
          <h1>Caricamento...</h1>
        </div>
      );
    }
  }
}

export default DetailsNotice;
