import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const filterOptions = [
  { label: "All Notes", value: "all" },
  { label: "My Notes", value: "mynotes" },
  { label: "Shared Notes", value: "shared" },
  { label: "Pinned Notes", value: "pinned" },
];

const FilterDropdown = ({ filter, setFilter }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-1/3 sm:w-44">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-md px-2 py-1 text-sm font-medium cursor-pointer"
      >
        <span>{filterOptions.find((f) => f.value === filter)?.label}</span>
        <ChevronDown size={18}
          className={`stroke-blue-600 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-blue-200 rounded-md shadow-md">
          {filterOptions.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setFilter(item.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer ${filter === item.value ? "bg-blue-50 text-blue-600 font-semibold" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;