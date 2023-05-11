import React from 'react'

function List({
    id, title, completed, todoData, setTodoData, provided, snapshot
}) {

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
    <div key={id} {...provided.draggableProps} 
         ref={provided.innerRef} {...provided.dragHandleProps} 
         className={`${snapshot.isDragging? "bg-gray-400" : "bg-gray-50"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}>
      <div className="items-center">
        <input type="checkbox" defaultChecked={false} onChange={()=>handleCheck(id)}/>
        <span className={completed ? "line-through text-sm" : "text-sm"}>
          {` ${title}`}
        </span>
      </div>
      <div className="items-center">
        <button onClick={() => handleClick(id)}>x</button>
      </div>
    </div>    
  )
}

export default List