import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import mockData from "../../mockData";
import Card from "../card/Card";
import { useState } from "react";

export default function Kanban() {
  const [data, setData] = useState(mockData);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    setData((prevData) => {
      // Copia profunda de los datos para evitar mutaciones
      const newData = JSON.parse(JSON.stringify(prevData));

      const sourceColIndex = newData.findIndex(
        (e) => e.id === source.droppableId
      );
      const destColIndex = newData.findIndex(
        (e) => e.id === destination.droppableId
      );

      if (sourceColIndex === -1 || destColIndex === -1) return prevData;

      const sourceCol = newData[sourceColIndex];
      const destCol = newData[destColIndex];

      const [movedTask] = sourceCol.tasks.splice(source.index, 1);
      destCol.tasks.splice(destination.index, 0, movedTask);

      return newData;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                className="kanban_section"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="kanban_section_title">
                  <h2>{section.title}</h2>
                </div>
                <div className="kanban_section_content">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? 0.9 : 1,
                          }}
                        >
                          <Card task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}{" "}
                  {/* Necesario para mantener el espacio al arrastrar */}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
