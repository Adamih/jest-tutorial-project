import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import LoginForm from "./components/LoginForm";

const users = {
  "adahen@kth.se": {
    id: 0,
    username: "adamih",
    email: "adahen@kth.se",
  },
};

const passwords = {
  "adahen@kth.se": "admin",
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (!users[email]) return;
    if (passwords[email] !== password) return;

    setIsLoggedIn(true);
    setUser(users[email]);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!isLoggedIn ? (
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <LoginForm loginCallback={login} />
          </>
        ) : (
          <>
            <div>hello {user.username}!</div>
          </>
        )}
      </header>
    </div>
  );
};

export default App;
