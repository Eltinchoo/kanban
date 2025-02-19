import { v4 as uuidv4 } from "uuid";

const mockData = [
  {
    id: uuidv4(),
    title: "Por hacer",
    taks: [
      {
        id: uuidv4(),
        title: "Incribirme a JS",
      },
      {
        id: uuidv4(),
        title: "Curso de React",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "En proceso",
    taks: [
      {
        id: uuidv4(),
        title: "Curso de JS",
      },
      {
        id: uuidv4(),
        title: "Curso de React",
      },
    ],
  },

  {
    id: uuidv4(),
    title: "Completado",
    taks: [
      {
        id: uuidv4(),
        title: "Curso de HTML",
      },
    ],
  },
];

export default mockData;
