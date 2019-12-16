import React, { Component } from "react";
import {Card} from "../Card/Card";

export class Upload extends Component {
    render() {
        return(
            <Card
              title="Carica Documenti della Domanda"
              content = {
                <img src="/assets/images/upload.jpg"></img>
              }
            />
        )
    }
}
export default Upload;