import React from "react";
import './App.css';
import { 
  BrowserRouter as Router,
  Link, 
  Route, 
  Switch,
  useLocation } from "react-router-dom";

function Home() {
  return <p>Home</p>
}

function About() {
  return <p>About</p>
}

function NoMatch() {
  const location = useLocation();
  return (
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  );
}


function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
