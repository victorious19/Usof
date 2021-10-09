import React, {Component} from "react";
import CreatableSelect from 'react-select/creatable';
import Cookies from "js-cookie";
import axios from "axios";
import '../css/CreatePost.css';


export default class CreatePost extends Component {
    state = {categories: [], choice: []}

    componentDidMount() {
        if(Cookies.get('token')&&Cookies.get('id')) {
           axios.get('http://127.0.0.1:8000/api/all_categories', this.state)
              .then(res => {
                let categories_names = []
                  res.data.forEach(category => {
                    categories_names.push({value: category.title, label: category.title})
                  });
                  this.setState({categories: categories_names})
              })
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
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }
    select = (new_category, action) => {
        if (action.action === 'clear') 
            this.setState({choice: [] })
        else if (action.action === 'select-option' || action.action === 'remove-value' || action.action === 'create-option') {
            let arr = []
            new_category.forEach(elem => {
                arr.push(elem.value)
            })
            this.setState({choice: arr})
        }
    } 
    handleSubmit = event => {
        event.preventDefault()
        let data = {
            'author': Cookies.get('id'),
            'title':this.state.title,
            'content':this.state.content,
            'categories':JSON.stringify(this.state.choice)
        }
        axios.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
        axios.post(`http://127.0.0.1:8000/api/posts`, data)
            .then(() => {
                window.location.href = "/cabinet";
            })
            .catch(error => {
                alert(error)
            })
    }
    render() {
        return (
                <form id="create_post_box" onSubmit={this.handleSubmit}>
                    <h1>Create your post</h1>
                    <input name="title" type="text" placeholder="Title" onChange={this.handleChange}  required autoFocus className="input pass" />
                    <textarea name="content" placeholder="Content of post" className="input pass" required onChange={this.handleChange} style={{resize:"none"}}/>
                    <CreatableSelect isMulti onChange={this.handleChange} className="createpostselect" options={this.state.categories} placeholder="Choose categories" onChange={this.select}/>
                    <input type="submit" value="Create" className="inputButton" />
                </form>
        );
    }
}