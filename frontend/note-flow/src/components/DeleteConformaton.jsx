import React from 'react'
import { AlertTriangle } from "lucide-react";

const DeleteConformaton = ({onConfirm, onCancel}) => {
  return (
    <div>
      <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay for background */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onCancel}
        />

        {/*conformation popup*/}
        <div className="relative bg-white w-85 rounded-xl shadow-xl p-6 z-50 mx-2">

          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
          </div>

          <h2 className="text-center text-lg font-semibold text-gray-800">
            Are you sure?
          </h2>

          <p className="text-center text-sm text-gray-600 mt-2">
            This action will permanently delete the note. Do you want to continue?
          </p>

          <div className="mt-6 flex justify-between gap-3">
            <button onClick={onCancel}
              className="w-full py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button onClick={onConfirm}
              className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
    </div>
  )
}

export default DeleteConformaton
