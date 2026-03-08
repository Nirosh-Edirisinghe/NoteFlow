import mongoose from "mongoose";

const collaboratorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  role: {
    type: String,
    enum: ["viewer", "editor"],
    default: "viewer"
  }
});

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true
    },

    pinned: {
      type: Boolean,
      default: false
    },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

    collaborators: [collaboratorSchema]
  },
  {
    timestamps: true,
  }
);

const NoteModel = mongoose.model.note || mongoose.model('note', noteSchema)

export default NoteModel
