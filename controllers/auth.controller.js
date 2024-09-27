import { Role } from "../models/models.js";
import { User } from "../models/models.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
function generateAccessToken(userId, roles) {
  const secret = process.env.SECRET_TOKEN;

  return jwt.sign({ userId, roles }, secret, { expiresIn: "24h" });
}
export class AuthController {
  async registration(req, res) {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res
          .status(400)
          .send({ message: "Ошибка при регистрации", error });
      }

      const { username, password } = req.body;
      const candidate = await User.findOne({
        where: {
          username: username,
        },
      });
      console.log(candidate);

      if (candidate) {
        res
          .status(400)
          .send({ message: "пользователь с таким именем уже существует" });
      } else {
        let hashPassword = bcrypt.hashSync(password, 6);
        const userRole = await Role.findOne({
          where: {
            value: "ADMIN",
          },
        });
        const user = await User.create({
          username,
          password: hashPassword,
          roles: [userRole.value],
        });
        

        await user.save();
        res.send({
          message: "Пользователь был успешно зарегистрирован",
        });
      }
    } catch (err) {
      res.status(400).send({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: {
          username: username,
        },
      });

      if (!user) {
        return res
          .status(400)
          .send({ message: `пользователь ${username} не был найден` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.send(400).send({ message: "введен не верный пароль" });
      }
      const token = generateAccessToken(user.id, user.roles);
      await user.save();
      res.send({ token });
    } catch (err) {
      return res.status(400).send({ message: "Login Error" });
    }
  }
  async getUser(req, res) {
    try {
     
      const users = await User.findAll()
      res.send(users)
    } catch (err) {
      console.log(err);
      
    }
    
    
    try {
    } catch (err) {}
  }
}
