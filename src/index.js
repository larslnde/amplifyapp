import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Home from "./Home"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const routes = (
    <BrowserRouter>
      <div>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/Home" component={Home} />
          </Switch>
      </div>
    </BrowserRouter>
  );


const rootElement = document.getElementById("root");
ReactDOM.render(< App />, rootElement);