import React, {Component} from "react";
import "../css/Category.css";

export default class Category extends Component {
    validator(number) {
        return number>9?number:`0${number}`
    }
    getDate(date) {
        return `${this.validator(date.getDate())}.${this.validator(date.getMonth())}.${date.getFullYear()} ${this.validator(date.getHours())}:${this.validator(date.getMinutes())}`
    }
    render() {
        let category = this.props.category
        console.log(category)
        return (
            <div className="post">
                <p className="comment_date">{this.getDate(new Date(category.updated_at))}</p>
                <p className="category_title">Title: <a href={"/post_category/"+category.id}>{category.title}</a> </p>
                <p><span className="category_title">Description: </span>{category.description}</p>
            </div>
        );
    }
}