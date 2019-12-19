import React, { Component, useCallback, useState } from "react";
import { Card } from "../Card/Card";
import Button from "components/CustomButton/CustomButton";
import Dropzone from "../Dropzone/Dropzone";
import cuid from "cuid";

class Upload extends Component {
  render() {
    return (
      <Card
        content={
          <div>
            <h1> Carica Documenti</h1>
            <Button bsStyle="primary" round>
              Carica
              <i className="pe-7s-cloud-upload pe-personal-icon"></i>
            </Button>
            <Dropzone />
          </div>
        }
      />
    );
  }
}

export default Upload;
