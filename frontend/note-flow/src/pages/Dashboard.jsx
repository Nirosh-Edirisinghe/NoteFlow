import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { MoreVertical, Eye, Pencil, Trash2, Calendar, Users, Pin } from "lucide-react";
import { useState } from 'react';
import formatDate from '../Utils/FormatData.js';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import FilterDropdown from '../components/FilterDropdown .jsx';

const filterOptions = [
  { label: "All Notes", value: "all" },
  { label: "My Notes", value: "mynotes" },
  { label: "Shared Notes", value: "shared" },
  { label: "Pinned Notes", value: "pinned" },
];

const Dashboard = () => {
  const { token, notes, loading, fetchNotes, backendUrl, user } = useContext(AppContext)
  const [openMenuId, setOpenMenuId] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate()

  const getPreviewHTML = (html, maxLength = 130) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const firstElement = doc.body.firstElementChild;
    if (!firstElement) return "";

    // If paragraph
    if (firstElement.tagName === "P") {
      const paragraphs = doc.querySelectorAll("p");
      const preview = Array.from(paragraphs)
        .map(p => {
          const text = p.textContent.trim();
          if (text.length > maxLength) {
            return `<p>${text.slice(0, maxLength)}…</p>`;
          }
          return `<p>${text}</p>`;
        })
        .slice(0, 2);
      return preview.join("");
    }

    // If ordered or unordered list
    if (firstElement.tagName === "OL" || firstElement.tagName === "UL") {
      const listItems = firstElement.querySelectorAll("li");
      const previewItems = Array.from(listItems).slice(0, 3);
      return `<${firstElement.tagName.toLowerCase()}>${previewItems
        .map(li => li.outerHTML)
        .join("")}</${firstElement.tagName.toLowerCase()}>`;
    }

    // default fallback
    return firstElement.outerHTML;
  };

  // filter notes
  const filteredNotes = notes.filter(note => {
    if (filter === "pinned") return note.pinned;
    if (filter === "shared") {
      return note.collaborators.some(c => c.user === user._id) && note.userId !== user._id;
    }
    if (filter === "mynotes") {
      return note.userId?._id === user._id || note.userId === user._id;
    }
    return true;
  });

  // handle note pinned
  const pinNote = async (e, id) => {
    e.preventDefault();
    console.log("cal the pin api", token);

    try {
      const { data } = await axios.put(`${backendUrl}/api/note/pin-note/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}`, }, }
      );

      if (data.success) {
        toast.success(data.message);
        fetchNotes();
      } else {
        toast.error(data.message || "Failed to Pinned note");
      }
    } catch (error) {
      console.error("Error in Pinned note :", error);
      toast.error("Failed to Pinned");
    }
  };


  if (loading) {
    return <div className="p-6">Loading issue...</div>;
  }

  return (
    <>
      <div className="h-screen px-4 py-6 bg-white rounded-xl sm:p-6 flex flex-col">

        {/*  Fixed Header */}
        <div className="flex-none">
          <h1 className="text-3xl text-slate-700 mb-4">My Notes</h1>
          
          {/* filter section */}
          <div className="mb-3">
            {/*large screen view */}
            <div className="hidden sm:flex gap-6 mb-3">
              {filterOptions.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setFilter(item.value)}
                  className={`font-medium cursor-pointer ${filter === item.value
                    ? "text-blue-600 border-b border-blue-600"
                    : "text-gray-500"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Dropdown for mobile scree */}
            <div className="sm:hidden mb-3">
              <FilterDropdown filter={filter} setFilter={setFilter} />
            </div>

          </div>

          <hr className="text-gray-300 mb-4" />
        </div>

        <div className="flex-1 overflow-y-auto notes-scrollbar">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => {
              const collaboratorCount = note.collaborators.length;
              const isOnlyMe = collaboratorCount === 1 && note.collaborators[0].user === user?._id;

              return (
                <div key={note._id}
                  onClick={() => navigate(`/view-note/${note._id}`)}
                  className="flex flex-col justify-between p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full min-h-50"
                >
                  {/* Top Section */}
                  <div className="flex justify-between items-start">

                    {/* Title */}
                    <h2 className="text-lg mb-2 line-clamp-2 text-gray-700">
                      {note.title}
                    </h2>

                    <div className='flex items-center gap-2'>
                      {/* pin icon */}
                      <Pin size={16}
                        className={`cursor-pointer ${note.pinned ? "text-yellow-500" : "text-gray-400"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          pinNote(e, note._id)
                        }}
                      />

                    </div>
                  </div>

                  {/* Preview Content */}
                  <div
                    className="text-gray-500 text-sm prose"
                    dangerouslySetInnerHTML={{
                      __html: getPreviewHTML(note.content)
                    }}
                  />

                  {/* Bottom Section */}
                  <div className="flex justify-between items-center mt-4">

                    {/* User & Collaborators */}
                    <div className="flex items-center gap-3">

                      {/* User Avatar */}
                      {/* <img
                    src="https://i.pravatar.cc/30"
                    alt="user"
                    className="w-7 h-7 rounded-full"
                  /> */}

                      {/* Collaborators */}
                      <div className="flex items-center text-gray-600 text-sm gap-1">
                        <Users size={16} />
                        {collaboratorCount === 0 ? (
                          <span>Only You</span>
                        ) : isOnlyMe ? (
                          <span>You</span>
                        ) : (
                          <span>{collaboratorCount} Shared</span>
                        )}
                      </div>

                    </div>

                    {/* Created Date */}
                    <div className="flex items-center text-gray-600 text-sm gap-1">
                      <Calendar size={16} />
                      <span>
                        {formatDate(note.createdAt)}
                      </span>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
