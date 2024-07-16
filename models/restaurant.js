module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define(
      "Restaurant",
      {
        Restaurant_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        Restaurant_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        Restaurant_adresse: {
          type: DataTypes.STRING(250),
          allowNull: false,
        },
        Location_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Restaurant",
        tableName: "restaurants",
      }
    );
  
    return Restaurant;
  };
  