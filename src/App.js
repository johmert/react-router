import React, { useEffect, useState } from "react";
import './App.css';
import { 
  BrowserRouter as Router,
  Link, 
  Route, 
  Switch,
  useLocation,
  useParams } from "react-router-dom";

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

function UserProfile() {
  const [user, setUser] = useState({});
  
  const userId = useParams().userId;
  useEffect(() => {
    async function loadUser() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const userFromAPI = await response.json();
      setUser(userFromAPI);
    }
    loadUser();
  }, [userId]);
  
  if(user.id) {
    return Object.entries(user).map(([key, value]) => (
      <div key={key}>
        <label>{key}</label> : {JSON.stringify(value)}
        <hr/>
      </div>
    ));
  }
  return "Loading...";
}

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Link to="/" className="link">Home</Link>
          <Link to="/about" className="link">About</Link>
        </div>
        {Array(10)
          .fill()
          .map((ignoredValue, index) => index + 1)
          .map((id) => (
            <div key={id}>
              <Link to={`/user/${id}`}>User {id}</Link>
            </div>
          ))}
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/user/:userId">
            <UserProfile />
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
