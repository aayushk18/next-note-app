import { connectDB } from "../../../lib/db.js";
import Note from "../../../models/note.model.js";
import { NextResponse } from "next/server";

// CREATE & READ
export async function GET() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);
}

export async function POST(req) {
  await connectDB();
  const { title, content } = await req.json();
  const note = await Note.create({ title, content });
  return NextResponse.json(note);
}

// UPDATE
export async function PUT(req) {
  await connectDB();
  const { id, title, content } = await req.json();
  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );
  return NextResponse.json(updatedNote);
}

// DELETE
export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Note.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
