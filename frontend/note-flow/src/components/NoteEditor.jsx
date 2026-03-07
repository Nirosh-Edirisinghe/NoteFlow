import React, { useContext, useState } from 'react'
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext';

const extensions = [
  StarterKit
]

const content = ``

const NoteEditor = () => {
  
  const { token, backendUrl } = useContext(AppContext)
  const [title, setTitle] = useState("");
  const editor = useEditor({
    extensions,
    content
  })

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
      console.log(title);
      console.log(content);

      if (data.success) {
        // setCurrentNote(data.note); 
        toast.success(data.message || "Note created successfully");
      } else {
        toast.error(data.message || "Failed to create note");
      }
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Error creating note");
    }
  };

  return (
    <div className="p-4">
      <div className='flex gap-2 mb-4 flex-wrap'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`px-3 py-1 border rounded ${editor.isActive('bold') ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`px-3 py-1 border rounded ${editor.isActive('italic') ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          <em>I</em>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`px-3 py-1 border rounded ${editor.isActive('strike') ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          <s>S</s>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`px-3 py-1 border rounded ${editor.isActive('code') ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          code
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 border rounded ${editor.isActive('codeBlock') ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          codeBlock
        </button>

        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`px-3 py-1 border rounded ${editor.isActive('paragraph') ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          P
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 border rounded ${editor.isActive('heading', { level: 1 })
            ? 'bg-gray-600 text-white'
            : 'bg-white text-black'
            }`}
        >
          H1
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 border rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          H2
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 border rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          H3
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`px-3 py-1 border rounded ${editor.isActive('heading', { level: 4 }) ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          H4
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={`px-3 py-1 border rounded ${editor.isActive('heading', { level: 5 }) ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          H5
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={`px-3 py-1 border rounded ${editor.isActive('heading', { level: 6 }) ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          H6
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 border rounded ${editor.isActive('bulletList') ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          UL
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 border rounded ${editor.isActive('orderedList') ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          OL
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 border rounded ${editor.isActive('blockquote') ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          Quote
        </button>

        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-3 py-1 border rounded bg-white text-black"
        >
          HR
        </button>

        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="px-3 py-1 border rounded bg-white text-black"
        >
          Break
        </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="px-3 py-1 border rounded bg-white text-black disabled:opacity-50"
        >
          Undo
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="px-3 py-1 border rounded bg-white text-black disabled:opacity-50"
        >
          Redo
        </button>

      </div>

      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter note title..."
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
      />

      <div className="prose max-w-none border rounded p-4 min-h-75 bg-white">
        <EditorContent editor={editor} />
      </div>

      <button onClick={createNote} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Save
      </button>

    </div>
  )
}

export default NoteEditor
