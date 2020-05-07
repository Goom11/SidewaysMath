import React from "react";
import "./App.css";
import sidewaysmath from "./sidewaysmath.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      str1: "",
      str2: "",
      str3: "",
      bindings: new Map(),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const finalMapping = sidewaysmath(
      this.state.str1,
      this.state.str2,
      this.state.str3
    );
    this.setState({ bindings: finalMapping });
    event.preventDefault();
  }

  render() {
    const listItems = Array.from(
      this.state.bindings.keys()
    ).map((c) => (
      <li key={c}>
        {c} : {this.state.bindings.get(c)}
      </li>
    ));
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
            Plus Second Word:
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
            Equals Third Word:
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
          <ul>{listItems}</ul>
        </header>
      </div>
    );
  }
}

export default App;
