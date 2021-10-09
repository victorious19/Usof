import React, {Component} from "react";
import axios from 'axios';
import Post from './Post';
import Comment from './Comment';
import "../css/PostPage.css";
import NotFound from './NotFound';
import Cookies from "js-cookie";

export default class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            comments: [],
            notfound: false,
        };
      }

    newComment = event => {
        this.setState({content: event.target.value});
    }
    addComment = event => {
        if (this.state.content) {
        event.preventDefault();
        console.log(this.props.post)
        axios.post(`http://127.0.0.1:8000/api/posts/${this.state.post.id}/comments`, this.state)
        .then(res => {
            console.log(res.data)
            window.location.reload()
        })
        .catch(error => {
            alert(this.state.login)
        })
    }
    }
    componentDidMount() {
        axios.all([ 
            axios.get('http://127.0.0.1:8000/api/posts/'+this.props.match.params.post_id+'/comments', this.state),
            axios.get('http://127.0.0.1:8000/api/posts/'+this.props.match.params.post_id, this.state)
        ])
        .then(axios.spread((comments, post) => {
            this.setState({post: post.data,
            comments: comments.data})
        }))
        .catch(err=>{
            if(err.response?.status === 404) this.setState({notfound:true})
            else alert(err)
        })
    }
    render() {
        let post = this.state.post
        if(this.state.notfound) return <NotFound />
        return (
             <div className="home">
                <Post post={post} page="post_page" key={'post_page'+post.id}/>
                <input type="button" value="Create new comment" className="new_comment_button" onClick={()=>{window.location.href="#write_comment";document.querySelector('.comments a textarea').focus()}} />
                <div className="comments">
                    {this.state.comments.map((comment) => 
                    <Comment comment={comment} page="post_page" key={comment.id} />)}
                    {(Cookies.get('token')&&Cookies.get('id'))?
                    <div className="create_comment">
                        <a name="write_comment"><textarea className="comment_text" cols="40" rows="5" onChange={this.newComment}/></a>
                        <input type="button" value="Create comment" className="comment_create_button" onClick={this.addComment} />
                    </div>:''}
                </div>
            </div>
        );
    }
}