import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  reps: Number,
  calories: Number,
  weight: Number,
});

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
