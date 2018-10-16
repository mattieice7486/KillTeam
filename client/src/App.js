import React from "react";
import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Units from "./pages/Units";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Units} />
        <Route exact path="/units" component={Units} />
        <Route exact path="/units/:id" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
