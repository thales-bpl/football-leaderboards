import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class User extends Model {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

export default User;
