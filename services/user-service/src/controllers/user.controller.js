
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // 2. Check whether the email already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    // 5. Return response without password
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Fetch users error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
