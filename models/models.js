import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../db.js";
export const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    unique: true,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
    isToupperCase(value) {
      if(value.length > 0 && value[0] !== value.toUpperCase()[0]) {
        throw new Error('введите имя с большой буквы')
      }
    }
  },
  roles: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
});

export const Role = sequelize.define("role", {
  value: {
    type: DataTypes.STRING,
    unique: true,
    defaultValue: "USER",
  },
},);
Role.hasOne(User);
User.belongsTo(Role);
