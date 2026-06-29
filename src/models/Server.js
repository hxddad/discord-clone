import mongoose from "mongoose";

const serverSchema = new mongoose.Schema(
  {
     _id: { 
      type: String, 
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    icon: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Server", serverSchema);