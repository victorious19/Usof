import React, {Component} from "react";
import CreatableSelect from 'react-select/creatable';
import Cookies from "js-cookie";
import axios from "axios";
import '../css/CreatePost.css';


export default class UpdatePost extends Component {
    state = {categories: [], choice: [], post: {}, title:'', content:''}

    componentDidMount() {
        if(Cookies.get('token')&&Cookies.get('id')) {
           axios.all([
                axios.get('http://127.0.0.1:8000/api/categories', this.state),
                axios.get('http://127.0.0.1:8000/api/posts/'+this.props.match.params.post_id, this.state)
           ])
            .then(axios.spread((categories, post) => {
                let categories_names = categories.data.map(category=>({value: category.title, label: category.title}))
                document.querySelector('input[name="title"]').value = post.data.title
                document.querySelector('textarea[name="content"]').value = post.data.content
                let choice = JSON.parse(post.data.categories)
                // choice = choice.map(category=>({value: category, label: category}))
                this.setState({categories: categories_names, post:post.data, choice:choice, title:post.data.title, content:post.data.content})
            }))
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
        axios.patch(`http://127.0.0.1:8000/api/posts/${this.props.match.params.post_id}`, data)
            .then(() => {
                window.location.href = "/";
            })
            .catch(error => {
                alert(error)
            })
    }
    render() {
        return (
                <form id="create_post_box" onSubmit={this.handleSubmit}>
                    <h1>Update your post</h1>
                    <input name="title" type="text" placeholder="Title" onChange={this.handleChange}  required autoFocus className="input pass" />
                    <textarea name="content" placeholder="Content of post" className="input pass" required onChange={this.handleChange} style={{resize:"none"}}/>
                    <CreatableSelect isMulti onChange={this.handleChange} className="createpostselect" options={this.state.categories} placeholder="Choose categories" value={this.state.choice.map(category=>({value: category, label: category}))} onChange={this.select}/>
                    <input type="submit" value="Change" className="inputButton" />
                </form>
        );
    }
}