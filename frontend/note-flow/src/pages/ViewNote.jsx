import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Calendar, ArrowLeft, Pencil, Trash2, Users, Eye } from "lucide-react";
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import { useEffect } from 'react';
import formatDate from '../Utils/FormatData';
import NoteEditor from '../components/NoteEditor';
import UpdateNote from '../components/UpdateNote';
import CollaboratorModal from '../components/CollaboratorModal';
import { toast } from 'react-toastify';
import CollabDropdown from '../components/CollabDropdown';
import DeleteConformaton from '../components/DeleteConformaton';

const ViewNote = () => {
  const { id } = useParams();
  const { token, backendUrl, user, fetchNotes } = useContext(AppContext)
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [collabOpen, setCollabOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
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

    const isOwner =
      note.userId?._id === user._id || note.userId === user._id;

    const isEditor = note.collaborators?.some(
      (c) => c.user?._id === user._id && c.role === "editor"
    );

    const isEditable = isOwner || isEditor;

    if (!isEditable) {
      toast.error("Not Acces to edit this.");
      return;
    }
    setSelectedNote(note);
    setEditorOpen(true);
  };

  // Delete note
  const handleDelete = async () => {
    const isOwner = note.userId._id === user._id || note.userId === user._id;

    if (!isOwner) {
      toast.error("Only the owner can delete this note.");
      setShowConfirmDelete(false)
      return;
    }

    try {
      const { data } = await axios.delete(`${backendUrl}/api/note/delete/${note._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message || "Note deleted successfully");
        fetchNotes()
        navigate(-1); // go back after delete
      } else {
        toast.error(data.message || "Failed to delete note");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while deleting note");
    }
  };

  // controlor collab model open
  const handleCollaboratorOpen = (note) => {
    const isOwner = note.userId._id === user._id || note.userId === user._id;

    if (!isOwner) {
      toast.error("Only the owner can manage collaborators.");
      return;
    }

    setCollabOpen(true);
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  if (!loading && !note) {
    return <div className="p-6 text-center text-red-500">Note not found</div>;
  }

  return (
    <>
      <div className="h-screen px-4 py-6 bg-white rounded-xl sm:p-8 flex flex-col">

        {/* header section */}
        <div className="flex-none">
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4'>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <button onClick={() => navigate(-1)}
                className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
              >
                <ArrowLeft size={20} />
              </button>

              <h1 className="text-2xl lg:text-3xl text-slate-700 font-medium">
                View note
              </h1>
            </div>

            {/* buton section */}
            <div className='flex justify-end gap-4'>

              {/* Edit Button */}
              <button
                onClick={() => handleEditNote(note)}
                className="flex items-center gap-2 px-2 py-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition cursor-pointer"
              >
                <Pencil size={18} />
                <span className="hidden font-semibold">Edit Note</span>
              </button>

              {/* Delete Button */}
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="flex items-center gap-2 px-2 py-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition cursor-pointer"
              >
                <Trash2 size={18} />
                <span className="hidden font-semibold">Delete Note</span>
              </button>

              {/* Collaborator Button */}
              <button onClick={() => handleCollaboratorOpen(note)}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-100 transition cursor-pointer"
              >
                <Users size={18} />
                <span className="text-sm font-medium text-gray-600">Add User</span>
              </button>

              {/* show colloborators */}
              <div className='relative flex justify-end'>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-100 transition cursor-pointer"
                >
                  <Eye size={16} />
                  <span className="text-sm font-medium text-gray-600">View</span>
                </button>

                {/* Dropdown */}
                {open && (
                  <CollabDropdown note={note} onClose={() => setOpen(false)} />
                )}
              </div>
            </div>

          </div>
          <hr className='text-gray-300 mb-4' />
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto notes-scrollbar">

          <div className="flex justify-between items-center mb-4">
            <h1 className="text-slate-700 font-medium text-xl">
              {note.title}
            </h1>

            <span className="text-gray-500 text-sm">
              {formatDate(note.createdAt)}
            </span>
          </div>
          <div
            className="note-content prose max-w-none text-gray-700 bg-white px-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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

      {/* delete conformation modal */}
      {showConfirmDelete && (
        <DeleteConformaton
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmDelete(false)}
        />
      )}
    </>
  )
}

export default ViewNote
