const mockData = [
  {
    id: "todo", // Se usan IDs fijos para evitar que cambien en cada render
    title: "📝 Por hacer",
    tasks: [
      { id: "task-1", title: "Curso de CSS" },
      { id: "task-2", title: "Curso de React" },
    ],
  },
  {
    id: "in-progress",
    title: "✒️ En proceso",
    tasks: [
      { id: "task-3", title: "Curso de JS" },
      { id: "task-4", title: "Curso de Next.js" },
    ],
  },
  {
    id: "done",
    title: "✔️ Completado",
    tasks: [{ id: "task-5", title: "Curso de HTML" }],
  },
];

export default mockData;
