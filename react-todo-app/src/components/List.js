import React from 'react'

export default function List({ todoData, setTodoData }) {

  const handleCheck = (id) => {
    let newTodo = todoData.map((obj)=>{
      if(obj.id === id){
        obj.completed = !obj.completed;
      }
      return obj;
    });
     
    setTodoData(newTodo);
  }

  const handleClick = (id) => {
    let newTodoData = todoData.filter(obj=>obj.id !== id);
    setTodoData(newTodoData);
  }

  return (
    <div>
      {todoData.map((obj) => {
        return (
          <div key={obj.id}>
            <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-50 border rounded">
              <div className="items-center">
                <input type="checkbox" defaultChecked={false} onChange={()=>handleCheck(obj.id)}/>
                <span className={obj.completed ? "line-through text-sm" : "text-sm"}>
                  {` ${obj.title}`}
                </span>
              </div>
              <div className="items-center">
                <button onClick={() => handleClick(obj.id)}>x</button>
              </div>
            </div>
          </div>
        );
      })}    
    </div>
  )
}
