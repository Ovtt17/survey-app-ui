export interface Survey {
  id: number;
  title: string;
  description: string;
  creatorId: number;
  creator: string;
  rating: number;
  creationDate?: string;
}