import User, { IUser } from "./user";

import jwt from "jsonwebtoken";
import mongoose, { MongooseError } from "mongoose";
import bcrypt from "bcrypt";

const addUser = ({ email, username, password, isAdmin = false }: IUser) => {
  return new Promise<void>((resolve, reject) => {
    User.findOne({ $or: [{ email }, { username }] })
      .exec()
      .then((user: IUser | null) => {
        if (user)
          reject({ status: 411, message: "username or email already exists" });
        else
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              reject({ status: 500, message: "internal server error" });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email,
                username,
                password: hash,
                isAdmin,
              });
              return user
                .save()
                .then(() => resolve())
                .catch((err: MongooseError) => {
                  if (err.name === "ValidationError")
                  reject({ status: 400, message: "Validation error" });
                  else reject({ status: 500, message: "internal server error" });
                });
            }
          });
      })
      .catch((err) => reject(err));
  });
};

const getUser = (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username })
      .exec()
      .then((user) => {
        if (!user)
          return reject({ status: 411, message: "Failed to to login" });
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) reject({ status: 411, message: "Failed to to login" });
          if (res) {
            const token = jwt.sign({ _id: user._id }, "somekey", {
              expiresIn: "1h",
            });
            resolve(token);
          }
          reject({ status: 411, message: "Wrong username or password" });
        });
      });
  });
};

const getUserById = (id: string) => {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .exec()
      .then((user) => {
        if (!user) reject({ status: 404, message: "No user found" });
        else resolve(user);
      })
      .catch(() => reject({ status: 500, message: "Failed to find user" }));
  });
};

export const userService = {
  addUser,
  getUser,
  getUserById,
};
