import React, { useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";

export default function App() {

  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

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

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>To Do List</h1>
        </div>
        <List todoData={todoData} setTodoData={setTodoData}/>
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit}/>
      </div>
    </div>
  )
  
}