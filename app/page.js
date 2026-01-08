"use client";

import { useEffect, useState } from "react";
import NoteForm from "../components/NoteForm.jsx";
import NotesList from "../components/NotesList.jsx";
import { NotebookPen, PlusCircle, StickyNote } from "lucide-react";

export default function Home() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 px-4 sm:px-6 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
  
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-3xl sm:text-4xl font-extrabold text-gray-800">
              <NotebookPen className="w-8 h-8 text-black" />
              Notes App
            </h1>
            <p className="mt-2 text-gray-600 max-w-md">
              Create, manage, and organize your notes effortlessly.
            </p>
          </div>
        </header>
  
        {/* Create Note */}
        <section className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <PlusCircle className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-700">
              Create a New Note
            </h2>
          </div>
  
          <NoteForm fetchNotes={fetchNotes} />
        </section>

      {/* Notes List */}
      <section className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <StickyNote className="w-5 h-5 text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-700">
            Your Notes
          </h2>
        </div>

        <NotesList notes={notes} fetchNotes={fetchNotes} />
      </section>

    </div>
  </main>
);
  
}
