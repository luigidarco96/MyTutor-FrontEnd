import React, { Component } from "react";
import NoticeInformation from "../components/NoticeInformation/NoticeInformation";

class DetailsNotice extends Component {
    render() {
        return(<NoticeInformation notice={notice}/>)
    }
}
export default DetailsNotice;

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