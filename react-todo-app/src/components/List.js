import React, { useState } from 'react'

function List({
    id, title, completed, todoData, setTodoData, provided, snapshot
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

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

  const handleEditChange = (e)=> {
    setEditedTitle(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let newTodoData = todoData.map((obj)=>{
      if(obj.id === id){
        obj.title = editedTitle;
      }
      return obj;    
    });

    setTodoData(newTodoData);
    setIsEditing(false);
  }
  
  if(isEditing){
    return (
      <div key={id} {...provided.draggableProps} 
           ref={provided.innerRef} {...provided.dragHandleProps} className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-50 border rounded`}>
        <div className="items-center">
          <form onSubmit={handleSubmit}>
            <input 
              value = {editedTitle}
              onChange={handleEditChange}
              className= "w-full px-3 mr-4 text-gray-500 rounded" 
            />
          </form> 
        </div>
        <div className="items-center">
          <button onClick={handleSubmit}  className="px-4" type="submit">save</button>
          <button onClick={() => {
            setIsEditing(false)
            setEditedTitle(title)
          }}>
            x
          </button>
        </div>
      </div>    
    )
  }else {
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
          <button className="px-4" onClick={() => setIsEditing(true)}>edit</button>
          <button onClick={() => handleClick(id)}>x</button>
        </div>
      </div>    
    )
  }
}

export default React.memo(List);