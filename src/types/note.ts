export enum NoteTag {
  Todo = "Todo",
  Personal = "Personal",
  Work = "Work",
  Meeting = "Meeting",
  Shopping = "Shopping",
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}
