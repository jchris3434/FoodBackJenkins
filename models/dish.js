module.exports = (sequelize, DataTypes) => {
    const Dish = sequelize.define(
      "Dish",
      {
        Dish_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        Dish_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        Dish_description: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        Dish_price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        Dish_Date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        Restaurant_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Dish",
        tableName: "dishes",
      }
    );
  
    return Dish;
  };
  