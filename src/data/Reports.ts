import { Report } from "../types/report";

export const reports: Report[] = [
  {
    id: 1,
    title: "Reporte de Respuestas por Encuesta",
    description: "Un informe que muestra todas las respuestas de una encuesta específica.",
    requiresSurvey: true,
  },
  {
    id: 2,
    title: "Reporte de Participación",
    description: "Un informe que muestra la participación del usuario en diferentes encuestas, incluyendo detalles como el número de encuestas completadas.",
    requiresSurvey: false,
  },
  {
    id: 3,
    title: "Reporte de Tendencias de Respuestas",
    description: "Un informe que muestra las tendencias de las respuestas a lo largo del tiempo, útil para ver cómo cambian las opiniones de los usuarios.",
    requiresSurvey: true,
  },
  {
    id: 4,
    title: "Reporte de Encuestas Populares",
    description: "Un informe que muestra las encuestas más populares, basado en el número de participaciones o respuestas.",
    requiresSurvey: false,
  },
  {
    id: 5,
    title: "Reporte de Participación de Usuarios",
    description: "Un informe que muestra la participación de los usuarios en diferentes encuestas, incluyendo detalles como el número de encuestas completadas por cada usuario.",
    requiresSurvey: true,
  },
  {
    id: 6,
    title: "Reporte de Satisfacción de Usuarios",
    description: "Un informe que analiza las calificaciones promedio dadas por los usuarios en las encuestas, permitiendo identificar encuestas con alta o baja satisfacción.",
    requiresSurvey: false,
  }
];