import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  name: {
    type: String,
  },
  genre: {
    type: String,
  },
  authorId: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
