import { useState } from "react";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteNote, fetchNotes } from "../../services/noteService";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, search],
    queryFn: () => fetchNotes(currentPage, search),
    placeholderData: keepPreviousData,
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const handleDelete = (id: string): void => {
    deleteNoteMutation.mutate(id);
  };

  const updateCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      setCurrentPage(1);
    },
    1000
  );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            updateCurrentPage={updateCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} onDelete={handleDelete} />
      )}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm />
        </Modal>
      )}
    </div>
  );
}

export default App;
