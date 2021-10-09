import React from "react";
// import './App.css';
import Register from "./Components/Register";
import Login from "./Components/Login";
import Header from "./Components/Header";
import SendMail from "./Components/SendMail";
import PasswordReset from "./Components/PasswordReset";
import NotFound from "./Components/NotFound";
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from "./Components/Home";
import PostPage from "./Components/PostPage";
import MyCabinet from "./Components/MyCabinet";
import CreatePost from "./Components/CreatePost";
import PostCategory from "./Components/PostCategory";
import CategoryPage from "./Components/CategoryPage";
import UserPage from "./Components/UserPage";
import Search from "./Components/Search";
import Cabinet from "./Components/Cabinet";
import UpdatePost from "./Components/UpdatePost";

function App() {
  return (
    <div>
    < Header />

    <BrowserRouter>
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/password-reset" component={SendMail} />
                <Route exact path="/password-reset/:token" component={PasswordReset} />
                <Route exact path="/post/:post_id" component={PostPage} />
                <Route exact path="/cabinet" component={MyCabinet} />
                <Route exact path="/cabinet/:user_id" component={Cabinet} />
                <Route exact path="/create_post" component={CreatePost} />
                <Route exact path="/categories" component={CategoryPage} />
                <Route exact path="/users" component={UserPage} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/post/update/:post_id" component={UpdatePost} />
                <Route exact path="/post_category/:category_id" component={PostCategory} />
                <Route exact path="/" component={Home} />
                <Route exact path="" component={NotFound} />
            </Switch>

    </BrowserRouter>
    </div>
);
}

export default App;
