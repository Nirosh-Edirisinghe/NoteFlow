import NoteModel from "../models/noteModel.js";

// Create Note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
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

// get All notes
const getMyNotes = async (req, res) => {
  try {

    const userId = req.user.id;
    const notes = await NoteModel.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      notes
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to fetch notes"
    });
  }
};

export { createNote, getMyNotes }