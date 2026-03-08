import React, { useContext, useEffect, useRef } from 'react'
import { AppContext } from '../context/AppContext';

const CollabDropdown = ({ note, onClose }) => {

  const { user } = useContext(AppContext);
  const dropdownRef = useRef(null);

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

  return (
    <div>
      <div ref={dropdownRef} className="absolute right-0 mt-8 w-64 bg-white rounded-lg shadow-lg z-50 overflow-hidden animate-fadeIn">

        <div className="p-2 max-h-64 overflow-y-auto">
          {/* Owner */}
          <div className="flex items-center justify-between px-2 py-1 hover:bg-gray-50 rounded-md">
            <span className="text-gray-600">{note.userId.name}</span>
            <span className="text-xs text-gray-600 px-2 py-0.5 border border-gray-400 rounded-full">Owner</span>
          </div>

          {/* Divider */}
          {note.collaborators.length > 0 && <hr className="my-1 border-gray-200" />}

          {/* Collaborators */}
          {note.collaborators.map((c) => {
            const collabId = c.user?._id || c.user;
            const isCurrentUser = collabId === user._id;
            return (
              <div
                key={c._id}
                className="flex items-center justify-between px-2 py-1 hover:bg-gray-50 rounded-md"
              >
                <span className="text-gray-600">
                  {c.user.name}
                  {isCurrentUser && " (You)"}
                </span>

                {/* Show role only for current user */}
                {isCurrentUser && (
                  <span className="text-xs text-gray-600 px-2 py-0.5 border border-gray-400 rounded-full">
                    {c.role}
                  </span>
                )}
              </div>
            );
          })}

          {note.collaborators.length === 0 && (
            <div className="text-gray-400 text-sm px-2 py-1">No collaborators</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CollabDropdown
