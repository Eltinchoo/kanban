import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import mockData from "../../mockData";
import Card from "../card/Card";
import { useState } from "react";
import "./kanban.scss";

export default function Kanban() {
  // Estado para manejar los datos del tablero Kanban
  const [data, setData] = useState(mockData);

  // Función que se ejecuta cuando termina un evento de arrastre
  const onDragEnd = (result) => {
    if (!result.destination) return; // Si no hay destino, no se hace nada

    const { source, destination } = result;

    setData((prevData) => {
      const sourceColIndex = prevData.findIndex(
        (e) => e.id === source.droppableId
      );
      const destColIndex = prevData.findIndex(
        (e) => e.id === destination.droppableId
      );

      const sourceCol = prevData[sourceColIndex];
      const destCol = prevData[destColIndex];

      const sourceTasks = [...sourceCol.tasks];
      const destTasks = [...destCol.tasks];

      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      const updatedData = [...prevData];
      updatedData[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
      updatedData[destColIndex] = { ...destCol, tasks: destTasks };

      return updatedData;
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
                            opacity: snapshot.isDragging ? "0.5" : "1",
                          }}
                        >
                          <Card task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}{" "}
                  {/* 🔥 Esto es necesario para evitar errores */}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
