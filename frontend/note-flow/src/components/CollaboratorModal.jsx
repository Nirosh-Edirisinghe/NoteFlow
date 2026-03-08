import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const roles = ["viewer", "editor"];

const CollaboratorModal = ({ noteId, onClose, fetchNote }) => {

  const { backendUrl, token } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");

  const handleAdd = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/note/add-collaborator/${noteId}`,
        { email, role },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchNote()
        setEmail("");
      } else {
        toast.error(data.message || "Failed to add colloborators");
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to add collaborator");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg w-100 p-6 text-gray-700 ">

        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Add Collaborator
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 mb-4"
        />

        <div className="mb-4">
          <Listbox value={role} onChange={(value) => setRole(value)}>
            {({ open }) => (
              <div className="relative">

                {/* Button */}
                <Listbox.Button className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded-md px-3 py-2 text-left flex items-center justify-between text-gray-700">
                  <span className="capitalize">{role}</span>
                  <ChevronDown size={18}
                    className={`stroke-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </Listbox.Button>

                {/* Options */}
                <Listbox.Options className="absolute mt-1 w-full border border-gray-300 bg-white shadow-md rounded-md z-10 overflow-hidden">
                  {roles.map((r) => (
                    <Listbox.Option
                      key={r}
                      value={r}
                      className={({ active }) =>
                        `cursor-pointer px-3 py-1 capitalize border-b border-gray-100 ${active ? "bg-blue-200 text-gray-600" : "text-gray-700"
                        }`
                      }
                    >
                      {r}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded cursor-pointer" >
            Cancel
          </button>

          <button onClick={handleAdd} className="px-6 py-2 bg-blue-600 text-white rounded cursor-pointer">
            Add
          </button>
        </div>

      </div>

    </div>
  );
};

export default CollaboratorModal;