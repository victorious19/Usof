import React, {Component} from "react";
import "../css/Home.css";
import axios from 'axios';
import Post from './Post';
import NotFound from './NotFound';


export default class Search extends Component {
    state = { posts: [] }

    componentDidMount() {
        let search_value = new URLSearchParams(this.props.location.search).get("title")
        if(!search_value) window.location.href = '/'
        axios.get('http://127.0.0.1:8000/api/posts/search?search_value='+search_value, this.state)
            .then(res => {
                let posts = res.data
                if (posts) this.setState({posts: posts})
                else this.setState({posts: null})
                console.log(posts)
            })
            .catch(err=>{
                alert(err)
            })
    }
    
    render() {
        if (!this.state.posts.toString()) return (<NotFound />)
        return (
            <div className="home">
            {this.state.posts.map((post) => 
                <Post post={post}  key={post.id} page="search_page" />)
            }
            </div>
        );
    }
}