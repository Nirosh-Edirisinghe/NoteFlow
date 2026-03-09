import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CollabDropdown = ({ note, onClose, fetchNote }) => {

  const { user, backendUrl, token } = useContext(AppContext);
  const dropdownRef = useRef(null);
  const [collaborators, setCollaborators] = useState(note.collaborators || []);

  // Close dropdown 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Remove collaborator
  const handleRemoveCollaborator = async (collabId) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/note/${note._id}/collaborators/${collabId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setCollaborators(collaborators.filter(c => (c.user?._id || c.user) !== collabId));
        if (fetchNote) fetchNote();
      } else {
        toast.error(data.message || "Failed to remove user");
      }
    } catch (error) {
      console.error("Failed to remove collaborator:", error);
      toast.error("Failed to remove collaborator");
    }
  };

  const isOwner = note.userId._id === user._id;

  return (
    <div>
      <div ref={dropdownRef} className="absolute right-0 mt-8 w-64 bg-white rounded-lg shadow-lg z-50 overflow-hidden animate-fadeIn">

        <div className="p-2 max-h-64 overflow-y-auto">

          {/* Owner */}
          <div className="flex items-center justify-between px-2 py-1 hover:bg-gray-50 rounded-md">
            <span className="text-gray-600 text-sm">{note.userId.name}</span>
            <span className="text-xs text-gray-600 px-2 py-0.5 border border-gray-400 rounded-full">Owner</span>
          </div>

          {/* Divider */}
          {collaborators.length > 0 && <hr className="my-1 border-gray-200" />}

          {/* Collaborators */}
          {collaborators.map((c) => {
            const collabId = c.user?._id || c.user;
            const isCurrentUser = collabId === user._id;
            return (
              <div key={c._id}
                className="flex items-center justify-between px-2 py-1 hover:bg-gray-50 rounded-md"
              >
                <span className="text-gray-600 text-sm">
                  {c.user.name}
                  {isCurrentUser && " (You)"}
                </span>

                {/* display colloborators */}
                <div className="flex items-center gap-2">
                  {/* Show role only for current user */}
                  {isCurrentUser && (
                    <span className="text-xs text-gray-600 px-2 py-0.5 border border-gray-400 rounded-full">
                      {c.role}
                    </span>
                  )}

                  {isOwner && !isCurrentUser && (
                    <button
                      onClick={() => handleRemoveCollaborator(collabId)}
                      className="text-red-500 hover:text-red-600 p-1 rounded-full cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {collaborators.length === 0 && (
            <div className="text-gray-400 text-sm px-2 py-1">No collaborators</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CollabDropdown
