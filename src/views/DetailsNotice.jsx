import React, { Component } from "react";
import NoticeInformation from "../components/NoticeInformation/NoticeInformation";
import Upload from "../components/UploadDocuments/Upload";

class DetailsNotice extends Component {
    render() {
        return(<NoticeInformation notice={notice}/>)
        return <Upload />;
    }
}

const notice = {
    name: "Bando numero 1",
    articoli: [
        {
            title: "Articolo 1",
            body: "corpo dell'articolo"
        },
        {
            title: "Articolo 2",
            body: "corpo dell'articolo"
        },
        {
            title: "Articolo 3",
            body: "corpo dell'articolo"
        }
    ]
}
export default DetailsNotice;