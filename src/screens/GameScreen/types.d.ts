export type TQuestion = {
  id: number;
  picture: string;
  answers: TAnswer[];
};

export type TAnswer = {
  id: number;
  name: string;
  correct: boolean;
};
