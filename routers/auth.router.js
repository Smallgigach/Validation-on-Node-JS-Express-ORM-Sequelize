import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { check } from "express-validator";
import { authMiddleWare } from "../controllers/middleware/authMiddleware.js";
import { roleMiddleWare } from "../controllers/middleware/roleMiddleware.js";
const authController = new AuthController();

const router = Router();
router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 4 и не меньше 10 символов"
    ).isLength({ min: 4, max: 10 }),
  ],
  authController.registration
);
router.post("/login", authController.login);
router.get("/users",  roleMiddleWare(['ADMIN']), authController.getUser);
export const authRouter = router;