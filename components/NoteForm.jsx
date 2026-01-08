 "use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const PlusCircle = dynamic(() => import("lucide-react").then(m => m.PlusCircle), { ssr: false });
const Type = dynamic(() => import("lucide-react").then(m => m.Type), { ssr: false });
const AlignLeft = dynamic(() => import("lucide-react").then(m => m.AlignLeft), { ssr: false });

export default function NoteForm({ fetchNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createNote = async () => {

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!content.trim()) {
      toast.error("Content is required");
      return;
    }

    try {

         await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");
    fetchNotes();
    toast.success("Note created successfully")
    } catch (error) {
      toast.error("Failed to create Notes")
    }
 
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm space-y-4">
      
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <Type className="w-4 h-4" />
          Title
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <AlignLeft className="w-4 h-4" />
          Content
        </label>
        <textarea
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none transition"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={createNote}
          className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 active:scale-95 transition"
        >
          <PlusCircle className="w-4 h-4" />
          Add Note
        </button>
      </div>

    </div>
  );
}
