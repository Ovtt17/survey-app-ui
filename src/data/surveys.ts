import { Survey } from "../types/survey";

const surveys: Survey[] = [
  {
    id: 1,
    title: "Encuesta de Satisfacción",
    description: "Por favor, completa esta encuesta para ayudarnos a mejorar.",
    rating: 4.5,
    creator: "Juan Pérez",
    creatorId: 101,
  },
  {
    id: 2,
    title: "Encuesta de Producto",
    description: "Queremos saber tu opinión sobre nuestro nuevo producto.",
    rating: 4.0,
    creator: "María García",
    creatorId: 102,
  },
  {
    id: 3,
    title: "Encuesta de Servicio",
    description: "Ayúdanos a mejorar nuestro servicio.",
    rating: 4.2,
    creator: "Carlos López",
    creatorId: 103,
  },
  {
    id: 4,
    title: "Encuesta de Calidad",
    description: "Tu opinión es importante para nosotros.",
    rating: 4.8,
    creator: "Ana Martínez",
    creatorId: 104,
  },
];

export default surveys;