"use client";

import { Trash2, Clock } from "lucide-react";



export default function NotesList({ notes, fetchNotes }) {
  const deleteNote = async (id) => {
    await fetch("/api/notes", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchNotes();
  };

  return (
    <div className="space-y-4">
      {notes.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No notes yet. Start by creating one ✨
        </div>
      )}
  
      {notes.map((note) => (
        <div
          key={note._id}
          className="group bg-white rounded-2xl border border-gray-200 p-5
                     shadow-sm hover:shadow-md transition"
        >
          {/* Header */}
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="font-semibold text-lg text-gray-800">
                {note.title}
              </h2>
              <p className="text-gray-600 mt-1 leading-relaxed">
                {note.content}
              </p>
            </div>
  
            {/* Actions */}
            <button
              onClick={() => deleteNote(note._id)}
              className="p-2 rounded-lg hover:bg-red-50
                         opacity-0 group-hover:opacity-100
                         transition"
              aria-label="Delete note"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
  
          {/* Footer */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
            <Clock className="w-4 h-4" />
            {new Date(note.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
  
}
