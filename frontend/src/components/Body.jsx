import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import AddBook from "./add/AddBook";
import AddAuthor from "./add/AddAuthor";
import BookEditScreen from "./editScreens/BookEditScreen";
import AuthorEditScreen from "./editScreens/AuthorEditScreen";

const Body = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/addbook" component={AddBook} />
        <Route path="/addauthor" component={AddAuthor} />
        <Route path="/book/:id" component={BookEditScreen} />
        <Route path="/author/:id" component={AuthorEditScreen} />
      </Switch>
    </Router>
  );
};

export default Body;
