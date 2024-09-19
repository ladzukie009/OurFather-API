import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/duhaupnxy/image/upload/v1712134056/samples/balloons.jpg",
    },
    isActive: { type: Boolean, default: true },
    isFirstTimeLogin: { type: Boolean, default: true },
    role: { type: String, required: true, default: "user" },
    firstName: { type: String, required: true },
    middleName: { type: String, default: "" },
    lastName: { type: String, required: true },
    mobileNo: { type: String, default: "" },
    birthdate: { type: Date },
    gender: { type: String, default: "" },
    fullAddress: {
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      province: { type: String, default: "" },
      country: { type: String, default: "Philippines" },
      postalCode: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
