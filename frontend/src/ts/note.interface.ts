export interface NoteResponseType {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteRequestType {
  title?: string;
  content?: string;
}
