import React, { useState } from "react";
import "./App.css";

export default function App() {

  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");


  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    float: "right"
  };

  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none"
    }
  };

  const handleClick = (id) => {
    let newTodoData = todoData.filter(obj=>obj.id !== id);
    setTodoData(newTodoData);
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let newTodo = {
      id : Date.now(),
      title : value,
      completed: false
    }

    setTodoData(prev => [...prev, newTodo]);
    setValue("");
    
  } 

  const handleCheck = (id) => {
    let newTodo = todoData.map((obj)=>{
      if(obj.id === id){
        obj.completed = !obj.completed;
      }
      return obj;
    });
     
    setTodoData(newTodo);
  }


    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>To Do List</h1>
          </div>
          {todoData.map((obj) => {
            return (
              <div style={getStyle(obj.completed)} key={obj.id}>
                <p>
                  <input type="checkbox" defaultChecked={false} onChange={()=>handleCheck(obj.id)}/>
                  {` ${obj.title}`}
                  <button style={btnStyle} onClick={() => handleClick(obj.id)}>x</button>
                </p>
              </div>
            );
          })}
          <form style={{display: 'flex'}} onSubmit={handleSubmit}>
            <input type="text" 
                   name="value" 
                   style={{ flex: "10", padding: "5px"}}
                   placeholder="해야 할 일을 입력하세요."
                   value={value}
                   onChange={handleChange}
            />
            <input 
              type="submit"
              value="입력"
              className="btn"
              style={{ flex: "1" }}
            />            
          </form>
        </div>
      </div>
    )
  
}