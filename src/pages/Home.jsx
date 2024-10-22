import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getAllNotes, setGetAllNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null); // Set to null instead of false
  const [query, setQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  const navigation = useNavigate();

  const url = "http://localhost:5000/api/note";

  const handleAddNote = async (note) => {
    try {
      const response = await axios.post(`${url}/add`, note, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      if (response.status === 201) {
        await handleGetAllNotes();
        toast.success("Note Added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllNotes = async () => {
    const notes = await axios.get(`${url}/getAll`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    if (notes.status === 200) {
      setGetAllNotes(notes.data.notes);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      if (response.status === 200) {
        await handleGetAllNotes();
        toast.success("Note Delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = (note) => {
    setCurrentNote(note); // Set the selected note for editing
    setIsModalOpen(true);
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `${url}/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if (response.status === 200) {
        await handleGetAllNotes();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalSubmit = (note) => {
    if (currentNote) {
      // Edit existing note
      editNote(currentNote._id, note.title, note.description);
    } else {
      // Add new note
      handleAddNote(note);
    }
  };

  useEffect(() => {
    handleGetAllNotes();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      getAllNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, getAllNotes]);

  useEffect(() => {
    const checkAuth = () => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        return navigation("/login");
      }
    };
    checkAuth();
  }, [navigation]);

  return (
    <>
      <Navbar setQuery={setQuery} />
      <button
        onClick={() => {
          setCurrentNote(null); // Set to null for adding a new note
          setIsModalOpen(true);
        }}
        className="fixed right-4 bg-teal-500 bottom-4 text-white px-5 py-3 text-xl rounded-full"
      >
        +
      </button>

      {isModalOpen && (
        <NoteModal
          currentNote={currentNote} // Pass the current note (or null)
          isOpen={isModalOpen}
          onSubmit={handleModalSubmit} // Handle both add and edit
          onClose={() => setIsModalOpen(false)}
          editNote={editNote}
        />
      )}

      <section className="container mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 px-8">
        {filteredNotes?.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard
              deleteNote={deleteNote}
              onEdit={onEdit}
              note={note}
              key={note._id}
            />
          ))
        ) : (
          <p>No Notes...</p>
        )}
      </section>
    </>
  );
};

export default Home;
