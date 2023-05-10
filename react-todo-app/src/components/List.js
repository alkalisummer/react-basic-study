import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function List({ todoData, setTodoData }) {

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

  const handleEnd = (result) => {
    // 목적지가 없다면 return
    if(!result.destination) return;
    
    // react 의 불변성을 지켜주기 위해 새로운 todoData 생성
    const newTodoData = todoData;
    debugger;

    // 변경시키려 하는 객체를 배열에서 지우고 변수에 비구조화 할당함
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 index에 reorderedItem을 insert 한다.
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);

  }

  return (
    <DragDropContext onDragEnd={handleEnd}>
      <Droppable droppableId="todo">
        {(provided)=>(
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todoData.map((obj, index) => {
              return (
                <Draggable
                  key={obj.id}
                  draggableId={obj.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div key={obj.id} {...provided.draggableProps} 
                         ref={provided.innerRef} {...provided.dragHandleProps} 
                         className={`${snapshot.isDragging? "bg-gray-400" : "bg-gray-50"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}>
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
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}   
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default List;
