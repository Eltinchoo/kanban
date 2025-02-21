import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import mockData from "./mockData";
import Card from "../card/Card";
import { useState } from "react";

export default function Kanban() {
  const [data, setData] = useState(mockData);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppabledId) {
      const sourceColIndex = data.findIndex();
    }
  };

  return <div>Kanban</div>;
}
