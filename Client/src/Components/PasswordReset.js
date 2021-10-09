import React, {Component} from "react";
import '../css/Auth.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import NotFound from './NotFound';


export default class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        // alert(this.props.match.params.token)
    }


    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit = event => {
        event.preventDefault();

        axios.post(`http://127.0.0.1:8000/api/auth/password-reset/${this.props.match.params.token}`, this.state)
            .then(res => {
                window.location.href = ('/login')
            })
            .catch(error => {
                window.location.href = ('/not-found')
            })
    }
    render() {
        if (Cookies.get('token') !== this.props.match.params.token) {
            return (<NotFound />)
        }
        return (
            <div className="container">
                <div className="col-md-6">
                <div id="logbox">
                    <form id="signup">
                    <h1>Input new password</h1>
                    <input required name="password" type="password" placeholder="Password" onChange={this.handleChange} className="input pass" />
                    <input type="submit" onClick={this.handleSubmit} value="Change password" className="inputButton" />
                    <div className="text-center">Remember your password? <a href="http://localhost:3000/login" id="login_id">Login</a>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}