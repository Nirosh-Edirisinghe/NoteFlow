import NoteModel from "../models/noteModel.js";

// Create Note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const  userId  = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required" });
    }
    
    const note = await NoteModel.create({ title, content, userId });
    return res.status(201).json({ success: true, note, message: "Note created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { createNote }