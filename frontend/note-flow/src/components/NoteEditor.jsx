import React, { useContext, useState } from 'react'
import { useEditor, EditorContent } from "@tiptap/react";
import { Bold, Italic, Strikethrough, Code, Type, List, ListOrdered, Eye, Undo, Redo, Hash } from "lucide-react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import axios from "axios";
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: 'Start writing your note...',
    showOnlyWhenEditable: true
  }),
]

const content = ``

const NoteEditor = () => {

  const { token, backendUrl, fetchNotes } = useContext(AppContext)
  const [title, setTitle] = useState("");
  const editor = useEditor({
    extensions,
    content
  })

  const navigate = useNavigate()

  // handle create notes
  const createNote = async (e) => {
    e.preventDefault();
    if (!editor) return;

    const content = editor.getHTML();
    console.log(token);

    try {
      const { data } = await axios.post(`${backendUrl}/api/note/create`, {
        title,
        content,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        // setCurrentNote(data.note); 
        toast.success(data.message || "Note created successfully");
        fetchNotes();
        navigate(-1);
      } else {
        toast.error(data.message || "Failed to create note");
      }
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Error creating note");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 bg-white sticky top-0 z-10">
        <div className='flex gap-2 mb-4 flex-wrap'>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('bold') ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
          >
            <Bold size={16} />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`px-3 py-1 border  border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('italic') ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
          >
            <Italic size={16} />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`px-3 py-1 border  border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('strike') ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
          >
            <Strikethrough size={16} />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={`px-3 py-1 border  border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('code') ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
          >
            <Code size={16} />
          </button>

          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`px-3 py-1 border  border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('paragraph') ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
          >
            P
          </button>

          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-3 py-1 border  border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${editor?.isActive('heading', { level: 1 }) ? 'bg-gray-300 text-gray-700' : 'bg-white text-gray-700'}`}
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

      <div className="flex-1 overflow-y-auto p-4 notes-scrollbar">
        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Note Title..."
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-800 font-medium"
        />

        <div className="prose max-w-none border border-gray-300 shadow-md rounded-lg p-4 min-h-75 bg-white text-gray-800">
          <EditorContent editor={editor} />
        </div>

        <button onClick={createNote} className="mt-4 px-8 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-600 cursor-pointer">
          Save Note
        </button>
      </div>


    </div>
  )
}

export default NoteEditor
