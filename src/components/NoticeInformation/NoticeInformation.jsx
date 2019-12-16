import React, { Component, Fragment } from "react";
import {Card} from "../Card/Card";

export class NoticeInformation extends Component {

    render() {
        const {notice} = this.props;
        return (
            <div>
                <Card
                    title = {notice.name}
                    content = {
                        <div>
                            {notice.articoli.map((current) =>{
                                return (<Fragment>
                                    <h4 style={{"margin-left": "10px"}}>{current.title}</h4>
                                        <p style={{"margin-left": "20px"}}>{current.body}</p>
                                </Fragment>)
                            })}
                        </div>
                    }
                />
            </div>
        )
    }
}

export default NoticeInformation;