import React, {Component} from "react";
import '../css/Auth.css';
import axios from 'axios';
import Cookies from 'js-cookie';


export default class Register extends Component {
    state = {}

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit = event => {
        event.preventDefault();

        axios.post(`http://127.0.0.1:8000/api/auth/register`, this.state)
            .then(res => {
                console.log(res.data);
                Cookies.set('token', res.data['token'])
                Cookies.set('id', res.data.user['id'])
                console.log(res.data['token'])
                window.location.href = "/";
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
                    <form id="signup" onSubmit={this.handleSubmit}>
                    <h1>Create an account</h1>
                    <input name="email" type="email" placeholder="Email" onChange={this.handleChange} required autoFocus className="input pass" />
                    <input name="full_name" type="text" placeholder="Full Name" onChange={this.handleChange} required className="input pass" />
                    <input name="login" type="text" placeholder="Username" onChange={this.handleChange} required className="input pass" />
                    <input name="password" type="password" placeholder="Password" onChange={this.handleChange} required className="input pass" />
                    <input name="password_confirmation" type="password" placeholder="Password Confirmation" onChange={this.handleChange} required className="input pass" />
                    <input type="submit" value="Sign me up!" className="inputButton" />
                    <div className="text-center">Already have an account? <a href="/login" id="login_id">Login</a>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}