import React, {Component} from "react";
import '../css/NotFound.css';


export default class NotFound extends Component {
    render() {
        return (
            <div className="mainbox_404">
                <p className="err_404">404</p>
                <div className="msg_404">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <a href="/" className="notfound">home</a> and try from there.</p></div>
            </div>
        );
    }
}