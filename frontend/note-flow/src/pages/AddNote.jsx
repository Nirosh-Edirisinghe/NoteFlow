import React from 'react'
import NoteEditor from '../components/NoteEditor'

const AddNote = () => {
  return (
    <div className='px-1 py-6 bg-white rounded-xl sm:p-6 min-h-screen'>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl mb-6 text-center text-slate-700 font-semibold">Add Your notes</h1>
          <NoteEditor />
        </div>
      </div>
    </div>
  )
}

export default AddNote
