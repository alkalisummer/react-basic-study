import React, {Component} from "react";
import "./App.css";

export default class App extends Component {

  state = {
    todoData : [
      {
        id: "1",
        title: "공부하기",
        completed: true
      },
      {
        id: "2",
        title: "청소하기",
        completed: false
      },
    ]
  }
  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    float: "right"
  };

  getStyle = () => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: "none"
    }
  };

  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter(obj=>obj.id !== id);
    this.setState({todoData : newTodoData});
  }


  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>To Do List</h1>
          </div>
          {this.state.todoData.map((obj) => {
            return (
              <div style={this.getStyle()} key={obj.id}>
                <p>
                  <input type="checkbox" defaultChecked={false}/>
                  {` ${obj.title}`}
                  <button style={this.btnStyle} onClick={() => this.handleClick(obj.id)}>x</button>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}