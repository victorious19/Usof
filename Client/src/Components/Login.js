import React, {Component} from "react";
import '../css/Auth.css';
import axios from 'axios';
import Cookies from 'js-cookie';


export default class Login extends Component {
    state = {}


    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit = event => {
        event.preventDefault();
        
        axios.post(`http://127.0.0.1:8000/api/auth/login`, this.state)
            .then(res => {
                console.log(res.data);
                Cookies.set('token', res.data['token'])
                Cookies.set('id', res.data.user['id'])
                console.log(res.data['token'])
                window.location.href = "/";
            })
            .catch(error => {
                alert(error)
                // alert(this.state.login)
            })
    }
    render() {
        return (
            <div className="container">
                <div className="col-md-6">
                <div id="logbox">
                    <form id="signup" onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <input type="text" required name="login" placeholder="Userneme" onChange={this.handleChange} className="input pass" />
                    <input type="password" required name="password" placeholder="Password" onChange={this.handleChange} className="input pass" />
                    <input type="submit" value="Sign me in!" className="inputButton" />
                    <div className="text-center">
                        <p>Don't have an account? <a href="/register">Sing up</a></p>
                        <p><a href="/password-reset">Forgotten password?</a></p>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}