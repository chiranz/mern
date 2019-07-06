import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <div>
      <Router>
        <MenuBar />
        <Container>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Container>
      </Router>
    </div>
  );
}

export default App;
