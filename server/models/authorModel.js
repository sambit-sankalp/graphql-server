import mongoose from "mongoose";

const authorSchema = mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const Author = mongoose.model("Author", authorSchema);

export default Author;
