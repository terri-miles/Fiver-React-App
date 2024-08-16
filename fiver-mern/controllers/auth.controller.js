import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send("New user has be created!");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    // find User from db
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    // Compare the password from db
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const age = 1000 * 60 * 60 * 24 * 7;
    
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_SECRET,
      { expiresIn: age }
    );

    const { password, ...userInfo } = user._doc;

    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .send(userInfo);
  } catch (error) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out!");
  } catch (error) {
    next(err);
  }
};
