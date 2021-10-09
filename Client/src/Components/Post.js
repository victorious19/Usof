import React, {Component} from "react";
import '../css/Post.css';
import axios from 'axios';
import Cookies from 'js-cookie';

export default class Post extends Component {
   constructor(props) {
      super(props)
      this.state = {}
   }
   validator(number) {
         return number>9?number:`0${number}`
   }
   getDate(date) {
      return `${this.validator(date.getDate())}.${this.validator(date.getMonth())}.${date.getFullYear()} ${this.validator(date.getHours())}:${this.validator(date.getMinutes())}`
   }
   handlePostLike = event => {
      let post = this.props.post;
      event.preventDefault()
      
      axios.post(`http://127.0.0.1:8000/api/posts/${post.id}/like`, {type: 'like'})
          .then(res => {
            let like = document.getElementById(`post_like${post.id}`)
            let dislike = document.getElementById(`post_dislike${post.id}`)
            let rating = document.getElementById(`rating${post.id}`)
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
  handlePostDislike = event => {
   let post = this.props.post;
   event.preventDefault()

   axios.post(`http://127.0.0.1:8000/api/posts/${this.props.post.id}/like`, {type: 'dislike'})
       .then(res => {
         let like = document.getElementById(`post_like${post.id}`)
         let dislike = document.getElementById(`post_dislike${post.id}`)
         let rating = document.getElementById(`rating${post.id}`)
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
   delete(post_id) {
      axios.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
      axios.delete('http://127.0.0.1:8000/api/posts/'+post_id, this.state)
      .then(res => {
         if (this.props.page !== 'post_page') window.location.reload()
         else window.location.href = '/'
      })
      .catch(err=>{
         alert(err)
      })
   }
   componentDidMount() {
      if(Cookies.get('token')) {
         axios.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
         axios.get('http://127.0.0.1:8000/api/posts/'+this.props.post.id+'/mylike', this.state)
            .then(res => {
               let like = res.data
               if(like) {
                     if (like.type === 'like') 
                        document.getElementById(`post_like${this.props.post.id}`).checked = true
                     else if (like.type === 'dislike') 
                        document.getElementById(`post_dislike${this.props.post.id}`).checked = true
               }
            })
            .catch(err=>{
               this.setState({notfound: true})
            })
      }
  }
   render() {
      let post = this.props.post
      let categories = []
      if(post.categories && post.categories !== '[]') {
         let arr = JSON.parse(post.categories)
         for (let i = 0; arr[i]; i++) {
            categories.push(<span key={i}><a href={"/post_category/"+post.categories_id[i]}>{arr[i]}</a> </span>)
         }
      }
      else categories = <span><a href="/post_category">no_category</a> </span>
      let button = <input type="button" value="Read more" className="readmore" onClick={()=>window.location.href="/post/"+post.id} />
      let content_class = "post_content"
      if (this.props.page === "post_page") {
         button = <div></div>
         content_class = ""
      }
      return (
         <div className="post">
            {(`${post.author}` === Cookies.get('id'))?
            <div className="delete_update" style={{float: 'right'}}>
               <input type="button" value="Delete" onClick={()=>this.delete(post.id)} />
               <input type="button" value="Update"  onClick={()=>window.location.href="/post/update/"+post.id} />
            </div>:''}
            <b className="post_title">{post.title}</b>
            <p >{this.getDate(new Date(post.updated_at))}</p>
            <p className="post_category"><b>Categories: </b>{categories}</p>
            <pre className={content_class} style={{fontFamily:'Open Sans, Helvetica, sans-serif'}}>{post.content}</pre>
            {button}
            <div className="avatar_login_box">
               <a href={"/cabinet/"+post.author}><img src={'http://127.0.0.1:8000/images/'+post.img} alt="Avatar" className="post_avatar"></img></a><br/>
               <a href={"/cabinet/"+post.author} style={{textDecoration:"none", color:"black"}}><p>{post.author_login}</p></a>
            </div>
            <div className="post_like_or_dislike" id={`like${post.id}`}>
               <input id={`post_like${post.id}`} type="checkbox" onClick={this.handlePostLike} className="post_like" /><label htmlFor={`post_like${post.id}`} >❤️</label>
               <p className="post_rating">Rating of post: <span id={`rating${post.id}`}>{post.rating}</span></p>
               <input id={`post_dislike${post.id}`} type="checkbox"  onClick={this.handlePostDislike} className="post_dislike" /><label htmlFor={`post_dislike${post.id}`}>💔</label>
            </div>
         </div>
   )
   }
}