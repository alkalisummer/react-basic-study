import React, { useCallback, useState } from "react";
import "./App.css";
import Lists from "./components/Lists";
import Form from "./components/Form";

export default function App() {
  console.log("App Component");

  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    let newTodo = {
      id : Date.now(),
      title : value,
      completed: false
    }

    setTodoData(prev => [...prev, newTodo]);
    setValue("");
    
  }, [value]);

  const handleRemoveClick = () => {
    setTodoData([]);
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-5 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1 className="font-bold">To Do List</h1>
          <button onClick={handleRemoveClick} className="text-xs">Delete All</button>
        </div>
        <Lists todoData={todoData} setTodoData={setTodoData}/>
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit}/>
      </div>
    </div>
  )
  
}