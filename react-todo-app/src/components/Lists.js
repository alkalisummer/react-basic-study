import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from './List';

function Lists({ todoData, setTodoData }) {

  const handleEnd = (result) => {
    // 목적지가 없다면 return
    if(!result.destination) return;
    
    // react 의 불변성을 지켜주기 위해 새로운 todoData 생성
    const newTodoData = [...todoData];

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
                    <List 
                      key={obj.id}
                      id={obj.id}
                      title={obj.title}
                      completed={obj.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    />  
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

export default Lists;
