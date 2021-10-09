import React, {Component} from "react";
import axios from 'axios';
import Post from "./Post";
import Cookies from "js-cookie";
import "../css/Cabinet.css";
import Pagination from "react-js-pagination";

export default class Cabinet extends Component {
    state = {user: {}, posts: [], data: {}}
    
    componentDidMount() {
        if(Cookies.get('id') === this.props.match.params.user_id) window.location.href = '/cabinet'
        axios.all([ 
            axios.get('http://127.0.0.1:8000/api/users/'+this.props.match.params.user_id, this.state),
            axios.get('http://127.0.0.1:8000/api/users/'+this.props.match.params.user_id+'/posts', this.state)
        ])
        .then(axios.spread((user, posts) => {
            this.setState({user: user.data,
            posts: posts.data.data, data:posts.data})
        }))
        .catch(err=>{
            alert(err)
        })
    }
    getPosts(page = 1) {
        axios.get('http://127.0.0.1:8000/api/users/myposts?page=' + page, this.state)
            .then(res => {
                this.setState({posts: res.data.data})
                this.setState({data: res.data})
            })
            .catch(err => {
                alert(err)
            })
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
                        <p>Fullname: {user.full_name}</p>
                        <p>Email: {user.email}</p>
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