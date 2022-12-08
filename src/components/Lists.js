import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { List } from './List';

const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {
  const handleEnd = result => {
    if (!result.destination) return;

    const newTodoData = [...todoData];

    // 변경시키는 아이템을 배열에서 지워줌
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // return 값으로 지워진 아이템을 잡아줌
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      handleClick={handleClick}
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default Lists;



