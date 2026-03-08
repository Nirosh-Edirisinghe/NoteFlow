import React from 'react'
import NoteEditor from '../components/NoteEditor'

const AddNote = () => {
  return (
    <div className='px-1 py-6 bg-white rounded-xl sm:p-6 min-h-screen'>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Add Your notes</h1>
          <NoteEditor />
        </div>
      </div>
    </div>
  )
}

export default AddNote
