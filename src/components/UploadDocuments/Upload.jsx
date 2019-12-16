import React, { Component } from "react";
import {Card} from "../Card/Card";
//import upload from "../../../../public/image/upload.jpg"

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