import { Report } from "../types/report";

export const reports: Report[] = [
  {
    id: 1,
    title: "Reporte de Respuestas por Encuesta",
    description: "Este informe detalla todas las respuestas recopiladas de una encuesta específica, proporcionando un análisis completo de las opiniones de los participantes.",
    requiresSurvey: true,
  },
  {
    id: 2,
    title: "Reporte de Participación en Encuestas",
    description: "Este informe presenta un resumen de la participación del usuario en diversas encuestas, incluyendo la fecha de la participación.",
    requiresSurvey: false,
  },
  {
    id: 3,
    title: "Reporte de Tendencias de Respuestas",
    description: "Este informe identifica y visualiza las tendencias en las respuestas a lo largo del tiempo, ayudando a comprender la evolución de las opiniones de los usuarios.",
    requiresSurvey: true,
  },
  {
    id: 4,
    title: "Reporte de Encuestas Populares",
    description: "Este informe enumera las encuestas más populares, basadas en el número de participaciones o respuestas, destacando aquellas que han captado mayor interés.",
    requiresSurvey: false,
  },
  {
    id: 5,
    title: "Reporte de Participación de Usuarios",
    description: "Este informe ofrece un análisis detallado de la participación de los usuarios en nuestras encuestas.",
    requiresSurvey: false,
  },
  {
    id: 6,
    title: "Reporte de Satisfacción de Usuarios",
    description: "Este informe evalúa las calificaciones promedio otorgadas por los usuarios en las encuestas, identificando las encuestas con mayor o menor grado de satisfacción.",
    requiresSurvey: false,
  }
];