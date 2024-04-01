export interface Note {
  _id: string;
  userId: string;
  content: string;
  date: string;
  tags: string[];
}

export interface Bucket {
  _id: string;
  userId: string;
  content: string;
  completed: boolean;
  date: string;
}

export type ModalAction = "edit" | "delete" | "new";
