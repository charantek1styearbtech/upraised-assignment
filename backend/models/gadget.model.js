const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/Gadgets.db');

class Gadgets extends Model {}

Gadgets.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Available', 'Deployed', 'Destroyed', 'Decommissioned'),
    allowNull: false,
  },
  decommissionedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Gadgets',
});

module.exports = Gadgets;