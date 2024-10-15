import axiosClient from '@/apis/axios-client';
import { NoteRequestType, NoteResponseType } from '@/ts/note.interface';
import { ListResponse } from '../ts/app.interface';

export const noteApi = {
  getAll(): Promise<ListResponse<NoteResponseType>> {
    const url = '/notes';
    return axiosClient.get(url);
  },

  getById(id: string): Promise<NoteResponseType> {
    const url = `/notes/${id}`;
    return axiosClient.get(url);
  },

  createNote(data: NoteRequestType): Promise<NoteRequestType> {
    const url = '/notes';
    return axiosClient.post(url, data);
  },

  updateNote(id: string, data: NoteRequestType): Promise<NoteRequestType> {
    const url = `/notes/${id}`;
    return axiosClient.put(url, data);
  },

  deleteNoteById(id: string) {
    const url = `/notes/${id}`;
    return axiosClient.delete(url);
  },
};
