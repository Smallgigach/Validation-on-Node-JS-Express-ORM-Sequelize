import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function roleMiddleWare(roles) {
  return function (req, res, next) {
    const secret = process.env.SECRET_TOKEN;
    if (req.method == "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).send({ msg: "пользователь не авторизован" });
      }
      const { roles: userRole } = jwt.verify(token, secret);
      let hasRole = false;
      userRole.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).send({ msg: "у вас нет доступа" });
      }
      next();
    } catch (err) {
      res.status(400).send({ msg: "пользователь не авторизован" });
    }
  };
}
