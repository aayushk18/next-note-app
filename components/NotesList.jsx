"use client";

import { useState } from "react";
import { Trash2, Clock, Pencil, Check, X } from "lucide-react";

export default function NotesList({ notes, fetchNotes }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const deleteNote = async (id) => {
    await fetch("/api/notes", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchNotes();
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const updateNote = async (id) => {
    await fetch("/api/notes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        title: editTitle,
        content: editContent,
      }),
    });

    cancelEdit();
    fetchNotes();
  };

  return (
    <div className="space-y-4">
      {notes.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No notes yet. Start by creating one ✨
        </div>
      )}

      {notes.map((note) => {
        const isEditing = editingId === note._id;

        return (
          <div
            key={note._id}
            className="group bg-white rounded-2xl border border-gray-200 p-5
                       shadow-sm hover:shadow-md transition"
          >
          
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                {isEditing ? (
                  <>
                    <input
                      className="w-full mb-2 rounded-lg border border-gray-300 px-3 py-2
                                 focus:ring-2 focus:ring-black outline-none"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <textarea
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2
                                 focus:ring-2 focus:ring-black outline-none resize-none"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <h2 className="font-semibold text-lg text-gray-800">
                      {note.title}
                    </h2>
                    <p className="text-gray-600 mt-1 leading-relaxed">
                      {note.content}
                    </p>
                  </>
                )}
              </div>

       
              <div className="flex gap-1">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => updateNote(note._id)}
                      className="p-2 rounded-lg hover:bg-green-50 transition"
                      aria-label="Update note"
                    >
                      <Check className="w-4 h-4 text-green-600" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 rounded-lg hover:bg-gray-100 transition"
                      aria-label="Cancel edit"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(note)}
                      className="p-2 rounded-lg hover:bg-gray-100
                                 opacity-0 group-hover:opacity-100 transition"
                      aria-label="Edit note"
                    >
                      <Pencil className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => deleteNote(note._id)}
                      className="p-2 rounded-lg hover:bg-red-50
                                 opacity-0 group-hover:opacity-100 transition"
                      aria-label="Delete note"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </>
                )}
              </div>
            </div>

 
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
              <Clock className="w-4 h-4" />
              {new Date(note.createdAt).toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
