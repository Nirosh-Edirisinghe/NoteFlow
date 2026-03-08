import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Calendar, ArrowLeft, Pencil, Trash2, Users } from "lucide-react";
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import { useEffect } from 'react';
import formatDate from '../Utils/FormatData';
import NoteEditor from '../components/NoteEditor';
import UpdateNote from '../components/UpdateNote';
import CollaboratorModal from '../components/CollaboratorModal';
import { toast } from 'react-toastify';

const ViewNote = () => {
  const { id } = useParams();
  const { token, backendUrl, user } = useContext(AppContext)
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [collabOpen, setCollabOpen] = useState(false);
  const navigate = useNavigate()

  // Fetch note by ID
  const fetchNote = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/note/get-note/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setNote(data.note);
      }
    } catch (error) {
      console.error("Failed to fetch note", error);
    } finally {
      setLoading(false);
    }
  };

  // handle update note
  const handleEditNote = (note) => {
    const isEditable = note.userId === user._id || note.collaborators?.some(c => c.user._id === user._id && c.role === "editor");

    if (!isEditable) {
      toast.error("Not Acces to edit this.");
      return;
    }
    setSelectedNote(note);
    setEditorOpen(true);
  };

  const handleDelete = () => {
    console.log("Delete note");
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  if (!note) {
    return <div className="p-6 text-center text-red-500">Note not found</div>;
  }

  return (
    <>
      <div className="h-screen px-2 py-6 bg-white rounded-xl sm:p-8 flex flex-col">

        {/* header section */}
        <div className="flex-none">
          <div className='flex justify-between mb-6'>

            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)}
                className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer"
              >
                <ArrowLeft size={20} />
              </button>

              <h1 className="text-xl lg:text-3xl text-slate-700 font-semibold">
                {note.title}
              </h1>
            </div>

            {/* Created Date */}
            {/* <div className="flex items-center text-gray-500 gap-2">
              <Calendar size={18} />
              <span>{formatDate(note.createdAt)}</span>
            </div> */}
            <div className="flex items-center gap-3">

              {/* Collaborator Button */}
              <button onClick={() => setCollabOpen(true)}
                className="flex items-center gap-2 px-2 py-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition cursor-pointer"
              >
                <Users size={18} />
                <span className="hidden md:inline font-semibold">Collaborators</span>
              </button>

              {/* Edit Button */}
              <button
                onClick={() => handleEditNote(note)}
                className="flex items-center gap-2 px-2 py-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition cursor-pointer"
              >
                <Pencil size={18} />
                <span className="hidden md:inline font-semibold">Edit Note</span>
              </button>

              {/* Delete Button */}
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-2 py-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition cursor-pointer"
              >
                <Trash2 size={18} />
                <span className="hidden md:inline font-semibold">Delete Note</span>
              </button>
            </div>

          </div>
          <hr className='text-gray-400 mb-6' />
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto">
          <div
            className="note-content prose max-w-none bg-white px-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </div>
      </div>

      {editorOpen && selectedNote && (
        <UpdateNote
          note={selectedNote}
          onClose={() => setEditorOpen(false)}
          fetchNote={fetchNote}
        />
      )}

      {/* open collobarator model */}
      {collabOpen && (
        <CollaboratorModal
          noteId={id}
          onClose={() => setCollabOpen(false)}
          fetchNote={fetchNote}
        />
      )}
    </>
  )
}

export default ViewNote
