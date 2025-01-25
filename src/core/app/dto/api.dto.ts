export type User = {
  id: string;
  image: string | null;
  name: string;
  email: string;
  createdAt: Date;
};

export type Answer = {
  id: string;
  prompt: string;
  answer: string;
  idea: string;
};

export type Chat = {
  id: string;
  name: string;
  createdAt: Date;
};

export type Conversation = Chat & {
  answers: Answer[];
};
