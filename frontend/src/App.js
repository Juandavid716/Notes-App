import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import CreateNote from "./components/CreateNote";
import NoteList from "./components/NoteList";
import CreateUser from "./components/CreateUser";
function App() {
  return (
    <Router>
      <Navigation />
      <Route path="/" exact component={NoteList} />
      <Route path="/edit/:id" exact component={CreateNote} />
      <Route path="/create" exact component={CreateNote} />
      <Route path="/user" exact component={CreateUser} />
    </Router>
  );
}

export default App;
