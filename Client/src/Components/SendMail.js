import React, {Component} from "react";
import '../css/Auth.css';
import axios from 'axios';
import Cookies from 'js-cookie';


export default class SendMail extends Component {
    state = {}

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit = event => {
        event.preventDefault();

        axios.post(`http://127.0.0.1:8000/api/auth/password-reset`, this.state)
            .then(res => {
                Cookies.set('token', res.data)
                console.log(res.data)
            })
            .catch(error => {
                alert(error)
            })
    }
    render() {
        return (
            <div className="container">
                <div className="col-md-6">
                <div id="logbox">
                    <form id="signup">
                    <h1>Password reset</h1>
                    <input name="email" type="email" placeholder="Email" onChange={this.handleChange} autoFocus required className="input pass" />
                    <input type="submit"  onClick={this.handleSubmit} value="Send password to email" className="inputButton" />
                    <div className="text-center">Remember your password? <a href="/login" id="login_id">Login</a>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}