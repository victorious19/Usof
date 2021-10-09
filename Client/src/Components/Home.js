import React, {Component} from "react";
import "../css/Home.css";
import axios from 'axios';
import Post from './Post';
import Pagination from 'react-js-pagination'


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = { data: {}, posts: []}
    }
    handleChange = event => {
        event.preventDefault()
        this.getPosts(1, '&sort='+event.target.value)
        // window.location.href = '/?sort='+event.target.value
    }
    getPosts(page = 1, query = '') {
        axios.get('http://127.0.0.1:8000/api/posts?page='+page+query, this.state)
            .then(res => {
                this.setState({posts: res.data.data})
                this.setState({data: res.data})
            })
            .catch(err=>{
                alert(err)
            })
    }
    componentDidMount() {
        // let sort = new URLSearchParams(this.props.location.search).get("sort")
        this.getPosts(1)
    }
    
    render() {
        return (
            <div className="home">
                <select className="posts_select" onChange={this.handleChange}>
                    <option value="created_at,desc">Newest</option>
                    <option value="created_at,asc">Latest</option>
                    <option value="title,asc">By name ASC</option>
                    <option value="title,desc">By name DESC</option>
                </select>
                {this.state.posts.map((post) =>
                    <Post post={post} key={post.id} page="home_page"/>)
                }
                <div className="pagination_wrapper">
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