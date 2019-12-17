import React, { Component } from "react";
import { Card } from "../Card/Card";
import Button from "components/CustomButton/CustomButton";

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
          </div>
        }
      />
    );
  }
}

export default Upload;
