import NoteModel from "../models/noteModel.js";
import userModel from "../models/userModel.js";

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
    const notes = await NoteModel.find({
      $or: [
        { userId: userId }, // notes you own
        { "collaborators.user": userId } // notes shared with you
      ]
    }).sort({ createdAt: -1 });

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

    const note = await NoteModel.findOne({
      _id: noteId,
      $or: [
        { userId },
        { "collaborators.user": userId }
      ]
    })
      .populate("userId", "name email")
      .populate("collaborators.user", "name email");

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.json({ success: true, note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch note" });
  }
};

// update note
const updateNote = async (req, res) => {

  const noteId = req.params.id;
  const { title, content } = req.body;
  const userId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ success: false, message: "Title and content are required" });
  }

  try {
    const note = await NoteModel.findById(noteId).populate("collaborators.user");
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    // Check if user is owner or editor collaborator
    const isEditable =
      note.userId.toString() === userId ||
      note.collaborators.some(c => c.user._id.toString() === userId && c.role === "editor");

    if (!isEditable) {
      return res.status(403).json({ success: false, message: "You do not have permission to edit this note" });
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

// pinned note
const togglePinNote = async (req, res) => {
  try {

    const { id } = req.params;
    const note = await NoteModel.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.pinned = !note.pinned;
    await note.save();
    res.json({
      success: true,
      message: note.pinned ? "Note pinned" : "Note unpinned",
      note
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// add collaborators
const addCollaborator = async (req, res) => {
  try {

    const { id } = req.params;
    const { email, role } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const note = await NoteModel.findById(id);
    note.collaborators.push({
      user: user._id,
      role: role
    });

    await note.save();
    res.json({ success: true, message: "Collaborator added successful" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// delete note
const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = await NoteModel.findById(noteId);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    // Only owner can delete
    if (note.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    // Delete note
    await NoteModel.deleteOne({ _id: noteId });

    res.json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { createNote, getMyNotes, getNote, updateNote, togglePinNote, addCollaborator, deleteNote }