import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import HttpError from "../middleware/HttpError.js";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
    },

    studentId: {
      type: String,
      trim: true,
    },

    department: {
      type: String,
      trim: true,
    },

    semester: {
      type: Number,
    },

    phone: {
      type: String,
      trim: true,
    },

    profileImage: {
      type: String,
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);


// Hash Password
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 8);
});


// Login
UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new HttpError("Invalid email or password", 401);
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new HttpError("Invalid email or password", 401);
  }

  return user;
};


// Generate Token
UserSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign(
    {
      _id: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};


// Hide sensitive data
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;
  delete userObject.createdAt;
  delete userObject.updatedAt;

  return userObject;
};

const User = mongoose.models.user || mongoose.model("user", UserSchema);

export default User;