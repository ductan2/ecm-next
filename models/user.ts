import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";


const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxLength: 50
   },
   email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
      lowercase: true,
      minlength: 6,
      maxLength: 50
   },
   password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
   },
   role: {
      type: String,
      default: "user",
      enum: ["user", "admin"]
   },
   image: String,
   resetCode: {
      type: String,
      expiresAt: {
         type: Date,
         default: () => new Date(Date.now() + 10 * 60 * 1000)
      }
   }

}, { timestamps: true });
userSchema.plugin(uniqueValidator, { error: "{PATH} is already taken" });
export default mongoose.models.User || mongoose.model("User", userSchema);