const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, required: true },
  type: { type: String, required: true }, 
  gender: { type: String, required: true },
  occupation: {
    type: {
      student: {
        university: String,
        course: String,
        year: String,
      },
      employee: {
        company: String,
        position: String,
        experience: String,
      },
      owner: {
        companyName: String,
        industry: String,
        employeeCount: String,
      },
    },
    required: false,
  },
  tShirtSize: String,
  mealPreferences: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
