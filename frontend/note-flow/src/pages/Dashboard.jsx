import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { MoreVertical, Eye, Pencil, Trash2, Calendar, Users } from "lucide-react";
import { useState } from 'react';
import formatDate from '../Utils/FormatData.js';

const Dashboard = () => {
  const { notes, loading } = useContext(AppContext)
  const [openMenuId, setOpenMenuId] = useState(null);

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

  if (loading) {
    return <div className="p-6">Loading issue...</div>;
  }

  return (
    <>
      <div className="h-screen px-1 py-6 bg-white rounded-xl sm:p-6 flex flex-col">

        {/*  Fixed Header */ }
        <div className="flex-none">
          <h1 className="text-3xl text-slate-700 font-semibold mb-2">My Notes</h1>
          <hr className="text-gray-300 mb-4" />
        </div>

        <div className="flex-1 overflow-y-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (

            <div
              key={note._id}
              className="flex flex-col justify-between p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full min-h-50"
            >
              {/* Top Section */}
              <div className="flex justify-between items-start">

                {/* Title */}
                <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-700">
                  {note.title}
                </h2>

                {/* Menu */}
                <div className="relative">

                  <button
                    onClick={() => setOpenMenuId(openMenuId === note._id ? null : note._id)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute right-0 mt-2 w-36 bg-white border border-blue-200 rounded-lg shadow-md transition-all duration-200 ${openMenuId === note._id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                  >
                    <button className="flex items-center gap-2 px-3 py-2 w-full hover:bg-blue-80  hover:rounded-lg text-sm text-blue-600">
                      <Eye size={16} /> View
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 w-full hover:bg-blue-50 text-sm text-blue-600">
                      <Pencil size={16} /> Edit
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 w-full hover:bg-blue-50  text-blue-600 hover:rounded-lg text-sm">
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>

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
                    <span>3 Share</span>
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
          ))}
        </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
