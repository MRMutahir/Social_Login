import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    email: String,
    image: String,
  },
  { timestamps: true }
);

const userDB = mongoose.model("userDB", userSchema);
export { userDB };
