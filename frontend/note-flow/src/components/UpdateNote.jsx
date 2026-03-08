import React, { useContext, useEffect, useState } from 'react';
import { useEditor, EditorContent } from "@tiptap/react";
import { Bold, Italic, Strikethrough, Code, List, ListOrdered, Undo, X} from "lucide-react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const UpdateNote = ({ note, onClose, fetchNote }) => {
  const { token, backendUrl, fetchNotes } = useContext(AppContext);
  const [title, setTitle] = useState(note?.title || "");

  // Initialize Tiptap editor with pre-filled content
  const editor = useEditor({
    extensions: [StarterKit],
    content: note?.content || "",
  });

  // Update note 
  const updateNote = async (e) => {
    e.preventDefault();
    if (!editor) return;

    if (!title || title.trim() === "") {
      toast.error("Title is required");
      return;
    }

    const content = editor.getHTML();

    try {
      const { data } = await axios.put(`${backendUrl}/api/note/update-note/${note._id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message || "Note updated successfully");
        fetchNote();
        fetchNotes();
        onClose();
      } else {
        toast.error(data.message || "Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Error updating note");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl h-[90vh] overflow-y-auto shadow-lg relative px-4 pb-4 mx-2 custom-scrollbar">

        <div className="sticky top-0 z-20 bg-white border-b border-gray-300 flex flex-col">

          <div className='flex justify-end mb-2 pt-4 pb-2'>
            {/* Close Button */}
            <button onClick={onClose} className="text-gray-600 font-semibold">
             <X size={20} />
            </button>
          </div>

          {/* Toolbar Buttons */}
          <div className="flex gap-2 flex-wrap p-2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('bold') ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('italic') ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
            >
              <Italic size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('strike') ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
            >
              <Strikethrough size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('code') ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
            >
              <Code size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={`px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('paragraph') ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
            >
              P
            </button>

            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('heading', { level: 1 })
                ? 'bg-gray-300 text-gray-700'
                : 'bg-white text-gray-700'
                }`}
            >
              H1
            </button>

            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
            >
              H2
            </button>

            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('heading', { level: 3 }) ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
            >
              H3
            </button>

            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={`px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('heading', { level: 4 }) ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
            >
              H4
            </button>

            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
              className={`px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('heading', { level: 5 }) ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
            >
              H5
            </button>

            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
              className={`px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('heading', { level: 6 }) ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
            >
              H6
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('bulletList') ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('orderedList') ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
            >
              <ListOrdered size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 bg-white text-gray-700"
            >
              HR
            </button>

            <button
              onClick={() => editor.chain().focus().setHardBreak().run()}
              className="px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 bg-white text-gray-700"
            >
              Break
            </button>

            <button
              onClick={() => editor.chain().focus().undo().run()}
              // disabled={!editor.can().chain().focus().undo().run()}
              className="px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 bg-white text-gray-700 disabled:opacity-50"
            >
              <Undo size={16} />
            </button>
          </div>
        </div>

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          className="w-full my-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
        />

        {/* Editor Content */}
        <div className="prose max-w-none border border-gray-300 shadow-md rounded-lg p-4 min-h-75 bg-white">
          <EditorContent editor={editor} />
        </div>

        {/* Save Button */}
        <button
          onClick={updateNote}
          className="mt-4 px-8 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-600 cursor-pointer">
          Update Note
        </button>
      </div>
    </div>
  );
};

export default UpdateNote;