import React, {Component} from "react";
import axios from 'axios';
import Category from './Category';
import Post from "./Post";


export default class PostCategory extends Component {
    state = {category: {}, posts: []}
    componentDidMount() {
        axios.all([ 
            axios.get('http://127.0.0.1:8000/api/categories/'+this.props.match.params.category_id, this.state),
            axios.get('http://127.0.0.1:8000/api/categories/'+this.props.match.params.category_id+'/posts', this.state)
        ])
        .then(axios.spread((category, posts) => {
            this.setState({category: category.data,
                posts: posts.data})
        }))
        .catch(err=>{
            alert(err)
        })
    }
    render() {
        let posts = this.state.posts
        
        return (
             <div className="home">
                <Category category={this.state.category} page="post_category_page" key={'post_category_page'+this.state.category.id}/>
                {
                    posts.map(post=>
                        <Post  post={post}  key={'post_category_page'+post.id} page="post_category_page" />
                    )
                }
            </div>
        );
    }
}