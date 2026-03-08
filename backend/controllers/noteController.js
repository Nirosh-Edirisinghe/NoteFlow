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

const getNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = await NoteModel.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.json({ success: true, note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch note" });
  }
};

const updateNote = async (req, res) => {

  const noteId = req.params.id;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ success: false, message: "Title and content are required" });
  }

  try {
    const note = await NoteModel.findOne({ _id: noteId });
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    // Update fields
    note.title = title;
    note.content = content;
    note.updatedAt = Date.now();

    await note.save();

    return res.status(200).json({ success: true, message: "Note updated successfully", note });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { createNote, getMyNotes, getNote, updateNote }