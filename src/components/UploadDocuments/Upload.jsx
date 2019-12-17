import React, { Component } from "react";
import {Card} from "../components/Card/Card";

class Upload extends Component {
    render() {
        return(
            <Card
                  title="Carica Documenti della Domanda"
                  content = {
                    <img src="..\..\..\public\image\upload.jpg"></img>
                  }
                 />
              )
    }
}
export default Upload;