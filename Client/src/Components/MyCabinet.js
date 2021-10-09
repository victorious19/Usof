import React, {Component} from "react";
import axios from 'axios';
import Post from "./Post";
import "../css/Cabinet.css";
import Cookies from "js-cookie";
import Pagination from "react-js-pagination";

export default class MyCabinet extends Component {
    constructor(props) {
        super(props)
        this.state = {user: {}, posts: [], data: {}}
        this.fileInput = React.createRef();
    }
    
    toEdit(event) {
        event.target.hidden = true
        document.getElementById('cabinet_form').hidden = false
    }
    toGeneral() {
        document.getElementById('cabinet_form').hidden = true
        document.getElementById('edit_button').hidden = false
    }
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }
    changepicture = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('profile_picture', this.fileInput.current.files[0])

        axios.post(`http://127.0.0.1:8000/api/users/avatar`, formData)
            .then(() => {
                window.location.reload()
            })
            .catch(error => {
                alert(error)
            })
    }
    update_profile = event => {
        event.preventDefault();
        console.log(this.state)

        axios.post(`http://127.0.0.1:8000/api/users/${this.state.user.id}`, this.state)
            .then(() => {
                window.location.reload()
            })
            .catch(error => {
                alert(error)
            })
    }
    componentDidMount() {
        if (Cookies.get('id')&&Cookies.get('token')) {
            axios.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
            axios.all([ 
                axios.get('http://127.0.0.1:8000/api/users/'+Cookies.get('id'), this.state),
                axios.get('http://127.0.0.1:8000/api/users/myposts', this.state)
            ])
            .then(axios.spread((user, posts) => {
                this.setState({user: user.data,
                posts: posts.data.data, data: posts.data})
            }))
            .catch(err=>{
                alert(err)
            })
        }
        else {
            Cookies.remove('token')
            Cookies.remove('id')
            window.location.href = '/login'
        }
    }
    getPosts(page = 1) {
        if (Cookies.get('id')&&Cookies.get('token')) {
            axios.get('http://127.0.0.1:8000/api/users/myposts?page=' + page, this.state)
                .then(res => {
                    this.setState({posts: res.data.data})
                    this.setState({data: res.data})
                })
                .catch(err => {
                    alert(err)
                })
        }
        else {
            Cookies.remove('token')
            Cookies.remove('id')
            window.location.href = '/login'
        }
    }
    render() {
        let user = this.state.user
        let posts = this.state.posts
        
        return (
            <div className="cabinet_container">
                <div className="cabinet_left">
                    <div id="logbox" style={{marginTop:"0px"}}>
                        <p>{user.login}</p>
                        <input id="cabinet_image" type="file" placeholder="Photo" ref={this.fileInput} onChange={this.changepicture}/>
                        <img src={'http://127.0.0.1:8000/images/'+user.profile_picture} alt="Avatar" className="cabinet_avatar"></img><br/>
                        <button onClick={()=>document.getElementById("cabinet_image").click()} className="inputButton">Upload new image</button>
                        <p>Fullname: {user.full_name}</p>
                        <p>Email: {user.email}</p>
                        <button id="edit_button" onClick={this.toEdit} className="inputButton">Edit profile</button>
                        <form hidden id="cabinet_form" onSubmit={this.update_profile}>
                            <input name="email" type="email" placeholder="Email" onChange={this.handleChange} autoFocus className="input pass" />
                            <input name="full_name" type="text" placeholder="Full Name" onChange={this.handleChange} className="input pass" />
                            <input name="login" type="text" placeholder="Username" onChange={this.handleChange} className="input pass" />
                            <input name="password" type="password" placeholder="Password" onChange={this.handleChange} className="input pass" />
                            <input name="password_confirmation" type="password" placeholder="Password Confirmation" onChange={this.handleChange} className="input pass" />
                            <input type= "submit" value="Edit" className="inputButton" />
                            <input type= "button" value="Cancel" className="inputButton" style={{backgroundColor:"red"}} onClick={this.toGeneral}/>
                        </form>
                    </div>
                </div>
                <div  className="cabinet_right">
                    {posts.map((post) => 
                        <Post post={post}  key={post.id} page="cabinet_page" />)}
                    {this.state.data.last_page>1?<Pagination
                        activePage={this.state.data.current_page}
                        onChange={this.getPosts.bind(this)}
                        itemsCountPerPage={this.state.data.per_page}
                        totalItemsCount={this.state.data.total}
                        innerClass="pagination"
                        itemClass="item_pagination"
                        activeClass="active_page"
                        linkClass="link_pagination"
                        activeLinkClass="active_link"
                        pageRangeDisplayed={5}
                        hideDisabled={true}
                    />:''}
                </div>
            </div>
        );
    }
}