import React, {Component} from "react";
import '../css/Header.css';
import axios from 'axios';
import Cookies from 'js-cookie';


export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {user:{}, isAuth: false}
    }
    logout() {
        Cookies.remove('token')
        Cookies.remove('id')
        window.location.href = '/login'
    }
    search() {
        let title = document.getElementById('searchbar').value
        if(title) window.location.href = '/search?title='+title
    }
    componentDidMount() {
        if(Cookies.get('token')&&Cookies.get('id')) {
            axios.get(`http://127.0.0.1:8000/api/users/${Cookies.get('id')}`, this.state)
            .then(res => {
                this.setState({user:res.data, isAuth: true})
            })
            .catch(error => {
                alert(error)
            })
        }
    }
    render() {
        let user = this.state.user
        let user_info = 
            <>
            <div>
                <a className="nohover">User</a>
                <a href="/login">Log in</a>
            </div>
            <a className="aimg"><img src={'http://127.0.0.1:8000/images/0.png'} alt="Your avatar" className="header_avatar" /></a>
            </>
        if (this.state.isAuth) {
            user_info = (
            <>
            <div>
                <a className="nohover">{user.role}</a>
                <div className="dropdown">
                    <a className="login">{user.login}</a>
                    <div className="dropdown-content">
                    <a href="/cabinet">Personal cabinet</a>
                    <a href="/create_post">Create new post</a>
                    <a onClick={this.logout}>Log out</a>
                    </div>
                </div>
            </div>
            <a href="/cabinet" className="aimg"><img src={'http://127.0.0.1:8000/images/'+user.profile_picture} alt="Your avatar" className="header_avatar" /></a>
            </>
            )
        }
        return (
            <ul className="topnav">
                <li>
                    <div className="needflex">
                        <input type="text" placeholder="Search post by name" style={{width:"200px"}} id="searchbar" />
                        <button className="headerbutton" id="search_button" onClick={this.search}>Search</button>
                    </div>
                    <div className="needflex">
                        <a href="/" className="headerbutton">Posts</a>
                        <a href="/categories" className="headerbutton">Categories</a>
                        <a href="/users" className="headerbutton">Users</a>
                    </div>
                </li> 
                <li className="lisite"><label className="sitename">ProCom</label></li>
                <li className="right needflex">
                    {user_info}
                </li>
            </ul>
        );
    }
}