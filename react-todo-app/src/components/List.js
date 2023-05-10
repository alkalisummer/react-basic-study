import React from 'react'

export default function List({ todoData, setTodoData }) {

  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    float: "right"
  };

  const handleCheck = (id) => {
    let newTodo = todoData.map((obj)=>{
      if(obj.id === id){
        obj.completed = !obj.completed;
      }
      return obj;
    });
     
    setTodoData(newTodo);
  }

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

  return (
    <div>
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
    </div>
  )
}
