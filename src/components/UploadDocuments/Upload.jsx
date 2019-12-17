import React, { Component } from "react";
import { Card } from "../Card/Card";

class Upload extends Component {
  render() {
    return (
      <Card
        title="Carica Documenti della Domanda"
        content={
          <img src="D:\Progetto\MyTutor-FrontEnd\public\image\upload.jpg"></img>
        }
      />
    );
  }
}
export default Upload;
