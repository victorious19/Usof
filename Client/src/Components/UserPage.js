import React, {Component} from "react";
import axios from 'axios';
import User from './User';
import Pagination from "react-js-pagination";

export default class UserPage extends Component {
    state = {users: [], data: {}}

    componentDidMount() {
        this.getUsers(1)
    }
    getUsers(page = 1) {
        axios.get('http://127.0.0.1:8000/api/users?page='+page, this.state)
            .then(res => {
                this.setState({users: res.data.data})
                this.setState({data: res.data})
            })
            .catch(err=>{
                alert(err)
            })
    }
    render() {
        let users = this.state.users
        
        return (
             <div className="home">
                 {users.map((user) => 
                    <User user={user}  key={user.id} page="user_page" />)
                }
                 {this.state.data.last_page>1?<Pagination
                     activePage={this.state.data.current_page}
                     onChange={this.getUsers.bind(this)}
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
        );
    }
}