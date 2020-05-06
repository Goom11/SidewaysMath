import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { str1: "", str2: "", str3: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.str1);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sideways Math Solver</h1>
          <label>
            First Word:
            <input
              type="text"
              id="str1"
              value={this.state.str1}
              onChange={(e) =>
                this.setState({ str1: e.target.value })
              }
            ></input>
          </label>
          <label>
            Second Word:
            <input
              type="text"
              id="str2"
              value={this.state.str2}
              onChange={(e) =>
                this.setState({ str2: e.target.value })
              }
            ></input>
          </label>
          <label>
            Third Word:
            <input
              type="text"
              id="str3"
              value={this.state.str3}
              onChange={(e) =>
                this.setState({ str3: e.target.value })
              }
            ></input>
          </label>
          <button onClick={this.handleSubmit}>
            Solve!
          </button>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
