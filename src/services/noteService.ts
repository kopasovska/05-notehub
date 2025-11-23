import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_NOTEHUB_TOKEN
}`;

interface FetchNotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string
): Promise<FetchNotesHttpResponse> => {
  const response = await axios.get<FetchNotesHttpResponse>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
    },
  });
  return response.data;
};

export const createNote = () => {};

export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete<Note>(`/notes/${id}`);
};
