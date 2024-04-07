const Cart = require('./cart');
const Product = require('./product');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'cartRow',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Product,
          key: 'id',
        },
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Cart,
          key: 'id',
        },
      },
    },
    { underscored: true, timestamps: true }
  );
};
