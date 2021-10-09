import React, {Component} from "react";
import axios from 'axios';
import Category from './Category';
import Pagination from 'react-js-pagination'

export default class CategoryPage extends Component {
    state = {categories: [], data: {}}
    componentDidMount() {
        this.get_categories(1)
    }
    get_categories(page = 1) {
        axios.get('http://127.0.0.1:8000/api/categories?page='+page, this.state)
            .then(res => {
                this.setState({categories: res.data.data})
                this.setState({data: res.data})
            })
            .catch(err=>{
                alert(err)
            })
    }
    render() {
        let categories = this.state.categories
        
        return (
             <div className="home">
                 {categories.map((category) => 
                    <Category category={category}  key={category.id} page="categories_page" />)
                }
                 {this.state.data.last_page>1?<Pagination
                     activePage={this.state.data.current_page}
                     onChange={this.get_categories.bind(this)}
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