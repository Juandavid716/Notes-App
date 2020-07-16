import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default class CreateNote extends Component {
  state = {
    users: [],
    userSelected: "",
    title: "",
    content: "",
    date: new Date(),
    editing: false,
    _id: "",
  };
  async componentDidMount() {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({ users: res.data, userSelected: res.data[0].username });
    // Crear o editar nota

    if (this.props.match.params.id) {
      const res = await axios.get(
        "http://localhost:4000/api/notes/" + this.props.match.params.id
      );
      this.setState({
        editing: true,
        _id: this.props.match.params.id,
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        userSelected: res.data.author,
      });
    }
  }
  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.editing) {
      const updatedNote = {
        title: this.state.title,
        content: this.state.content,
        author: this.state.userSelected,
        date: this.state.date,
      };
      await axios.put(
        "http://localhost:4000/api/notes/" + this.state._id,
        updatedNote
      );
    } else {
      const newNote = {
        title: this.state.title,
        content: this.state.content,
        dae: this.state.date,
        author: this.state.userSelected,
      };
      await axios.post("http://localhost:4000/api/notes", newNote);
    }

    this.props.history.push("/");
  };
  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeDate = (date) => {
    this.setState({ date: date });
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4> Create a Note </h4>
          <form onSubmit={this.onSubmit}>
            {/** SELECT USER */}
            <div className="form-group">
              <select
                className="form-control"
                name="userSelected"
                onChange={this.onInputChange}
                value={this.userSelected}
              >
                {this.state.users.map((user) => (
                  <option key={user._id}> {user.username}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="title"
                value={this.state.title}
                className="form-control"
                placeholder="title"
                required
                onChange={this.onInputChange}
              ></input>
            </div>
            <div className="form-group">
              <textarea
                name="content"
                className="form-control"
                placeholder="content"
                value={this.state.content}
                onChange={this.onInputChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={this.onChangeDate}
              ></DatePicker>
            </div>
            <button type="submit" className="btn btn-primary">
              Save a note
            </button>
          </form>
        </div>
      </div>
    );
  }
}
