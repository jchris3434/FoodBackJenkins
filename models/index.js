require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT || 'mysql',
  }
);

const RestaurantModel = require('./restaurant')(sequelize, DataTypes);
const DishModel = require('./dish')(sequelize, DataTypes);
const LocationModel = require('./location')(sequelize, DataTypes);

// relations
RestaurantModel.hasMany(DishModel, { foreignKey: 'Restaurant_id', as: 'dishes' });
DishModel.belongsTo(RestaurantModel, { foreignKey: 'Restaurant_id' });
RestaurantModel.belongsTo(LocationModel, { foreignKey: 'Location_id', as: 'location' });
LocationModel.hasMany(RestaurantModel, { foreignKey: 'Location_id', as: 'restaurants' });

// export modeles + instance de sequelize
module.exports = {
  sequelize,
  Restaurant: RestaurantModel,
  Dish: DishModel,
  Location: LocationModel,
};
