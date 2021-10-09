import React, {Component} from "react";
// import "../css/User.css";

export default class User extends Component {
    render() {
        let user = this.props.user
        return (
            <div className="post">
                <span style={{float:"right", marginTop:"30px", fontSize:"15pt"}}>User rating: {user.rating}</span>
                <div className="">
                    <a href={"/cabinet/"+user.id}><img src={'http://127.0.0.1:8000/images/'+user.profile_picture} alt="Avatar" className="post_avatar"></img></a><br/>
                    <a href={"/cabinet/"+user.id} style={{textDecoration:"none", color:"black"}}><span>{user.login}</span></a>
                </div>
            </div>
        );
    }
}