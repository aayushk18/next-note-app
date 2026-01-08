import toast from "react-hot-toast";
import { connectDB } from "../../../lib/db.js";
import Note from "../../../models/note.model.js";
import { NextResponse } from "next/server";



export async function GET() {
  await connectDB();
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);


  } catch (error) {
    console.log(error.message);
    
 
  }
  
}



export async function POST(req) {
  await connectDB();
  try {
    const { title, content } = await req.json();
  const note = await Note.create({ title, content });
 return NextResponse.json(note);

  } catch (error) {
    console.log(error.message);

  }
  
 
}




export async function PUT(req) {
    await connectDB();
    try {
        const { id, title, content } = await req.json();
        const updatedNote = await Note.findByIdAndUpdate(
          id,
          { title, content },
          { new: true }
        );
        return NextResponse.json(updatedNote);
       
    } catch (error) {
        console.log(error.message);

    }
 


}




export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  try {
    
    await Note.findByIdAndDelete(id);
  } catch (error) {
    console.log(error.message);
    
  }
  return NextResponse.json({ success: true });
}
