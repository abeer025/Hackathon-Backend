import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends of the string
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Ensures email is always stored in lowercase
      trim: true,
    },
    profileImage: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Ensures password is at least 6 characters long
    },
    role: {
      type: String,
      enum: ["user", "admin", "student", "trainer"],
      default: "user",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModal =
  mongoose.models.Users || mongoose.model("Users", userSchema);


