export interface Participation {
  id: number;
  userId: number
  username: string;
  profilePictureUrl: string;
  surveyId: number;
  surveyTitle: string
  participatedDate: Date;
}