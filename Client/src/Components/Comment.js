import React, {Component} from "react";
import axios from 'axios';
import "../css/Comment.css";
import Cookies from 'js-cookie';

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {status: 'normal'}
    }
    state = {status: 'normal'}
    validator(number) {
        return number>9?number:`0${number}`
    }
    getDate(date) {
        return `${this.validator(date.getDate())}.${this.validator(date.getMonth())}.${date.getFullYear()} ${this.validator(date.getHours())}:${this.validator(date.getMinutes())}`
    }
    handleCommentChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleCommentLike = event => {
        let comment = this.props.comment;
        event.preventDefault()
        
        axios.post(`http://127.0.0.1:8000/api/comments/${comment.id}/like`, {type: 'like'})
            .then(res => {
              let like = document.getElementById(`comment_like${comment.id}`)
              let dislike = document.getElementById(`comment_dislike${comment.id}`)
              let rating = document.getElementById(`comment_rating${comment.id}`)
              if (dislike.checked) {
                 dislike.checked = false
                 rating.innerText = +rating.innerText + 1
              }
              if (res.data === 1) {
                 like.checked = false;
                 rating.innerText = +rating.innerText - 1
              }
              else {
                 like.checked = true;
                 rating.innerText = +rating.innerText + 1
              }
            })
            .catch(err => {
              if (err.response?.status !== 401) {
                alert(err)
              }
            })
    }
    handleCommentDislike = event => {
     let comment = this.props.comment;
     event.preventDefault()
  
     axios.post(`http://127.0.0.1:8000/api/comments/${this.props.comment.id}/like`, {type: 'dislike'})
         .then(res => {
           let like = document.getElementById(`comment_like${comment.id}`)
           let dislike = document.getElementById(`comment_dislike${comment.id}`)
           let rating = document.getElementById(`comment_rating${comment.id}`)
           if (like.checked) {
              like.checked = false
              rating.innerText = +rating.innerText - 1
           }
           if (res.data === 1) {
              dislike.checked = false;
              rating.innerText = +rating.innerText + 1
           }
           else {
              dislike.checked = true;
              rating.innerText = +rating.innerText - 1
           }
         })
         .catch(err => {
           if (err.response?.status !== 401) {
              alert(err)
            }
         })
     }
    componentDidMount() {
        if(Cookies.get('token')) {
           axios.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
           axios.get('http://127.0.0.1:8000/api/comments/'+this.props.comment.id+'/mylike', this.state)
              .then(res => {
                 let like = res.data
                 if(like) {
                       if (like.type === 'like') 
                          document.getElementById(`comment_like${this.props.comment.id}`).checked = true
                       else if (like.type === 'dislike') 
                          document.getElementById(`comment_dislike${this.props.comment.id}`).checked = true
                 }
              })
              .catch(err=>{
                 alert(err)
              })
        }
    }
    delete(comment_id) {
        axios.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
        axios.delete('http://127.0.0.1:8000/api/comments/'+comment_id, this.state)
        .then(res => {
           window.location.reload()
        })
        .catch(err=>{
           alert(err)
        })
     }
    saveComment(comment_id) {
        axios.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
        axios.patch('http://127.0.0.1:8000/api/comments/'+comment_id, this.state)
            .then(res => {
                window.location.reload()
            })
            .catch(err=>{
                alert(err)
            })
    }
    render() {
        let comment = this.props.comment
        return (
            <div className='comment'>
                <p className="comment_date">{this.getDate(new Date(comment.updated_at))}</p>
                <div className="needflex">
                    <a href={"/cabinet/"+comment.user_id}>
                        <img src={'http://127.0.0.1:8000/images/'+comment.img} alt="Avatar" className="post_avatar" />
                    </a><br/>
                    <p><a href={"/cabinet/"+comment.user_id} style={{textDecoration:"none", color:"black"}}><span>{comment.user_login}</span></a>
                </p></div>
                <p className="comment_content">{comment.content}</p>
                {this.state.status === 'change'?
                    <textarea style={{width: "100%", marginBottom: "50px"}} onChange={this.handleCommentChange.bind(this)} name="content" defaultValue={comment.content} />:''}
                {(`${comment.user_id}` === Cookies.get('id'))?
                <div className="delete_update">
                    {this.state.status === 'normal'?
                    <div>
                        <input type="button" value="Delete" onClick={()=>this.delete(comment.id)} />
                        <input type="button" value="Update" onClick={()=>this.setState({status: 'change'})} />
                    </div>:
                    <div>
                        <input type="button" value="Cancel"  onClick={()=>this.setState({status: 'normal'})} />
                        <input type="button" value="Save" onClick={()=>this.saveComment(comment.id)}/>
                    </div>}
                </div>:''}
                <div className="post_like_or_dislike">
                    <input id={`comment_like${comment.id}`} type="checkbox" onClick={this.handleCommentLike} className="post_like" /><label htmlFor={`comment_like${comment.id}`} >❤️</label>
                    <p className="post_rating">Rating of comment: <span id={`comment_rating${comment.id}`}>{comment.rating}</span></p>
                    <input id={`comment_dislike${comment.id}`} type="checkbox"  onClick={this.handleCommentDislike} className="post_dislike" /><label htmlFor={`comment_dislike${comment.id}`}>💔</label>
                </div>
            </div>
        );
    }
}