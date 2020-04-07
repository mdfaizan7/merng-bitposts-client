import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// css
import "semantic-ui-css/semantic.min.css";

import { Container } from "semantic-ui-react";
// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// components
import Navbar from "./components/Navbar";

function App() {
  return (
    <Container>
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Router>
    </Container>
  );
}

export default App;
