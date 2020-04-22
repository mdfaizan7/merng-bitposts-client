import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// css
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
// context
import { AuthProvider } from "./context/auth";
// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
// components
import Navbar from "./components/Navbar";
// util
import AuthRoute from "./util/AuthRoute";

function App() {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <Navbar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/register" component={Register} />
          <AuthRoute exact path="/login" component={Login} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;
