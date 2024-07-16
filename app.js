const express = require('express');
const { sequelize } = require('./models');

const restaurantController = require('./controller/restaurantController');
const locationController = require('./controller/locationController');
const dishController = require('./controller/dishController');

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Synchronisation des modèles avec la base de données si non en mode test
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync().then(() => {
    console.log('Les tables ont bien été mises à jour');
  }).catch(err => {
    console.error('Erreur lors de la synchronisation des tables:', err);
  });
}

// Route de base
app.get('/home', (req, res) => {
  res.send('Serveur Back OK');
});

// Routes CRUD pour les restaurants
app.get('/restaurants', restaurantController.getAllRestaurants);
app.get('/restaurants/:id', restaurantController.getRestaurantById);
app.post('/restaurants', restaurantController.createRestaurant);
app.put('/restaurants/:id', restaurantController.updateRestaurant);
app.delete('/restaurants/:id', restaurantController.deleteRestaurant);

// Routes CRUD pour les locations
app.get('/locations', locationController.getAllLocations);
app.get('/locations/:id', locationController.getLocationById);
app.post('/locations', locationController.createLocation);
app.put('/locations/:id', locationController.updateLocation);
app.delete('/locations/:id', locationController.deleteLocation);

// Routes CRUD pour les plats (dishes)
app.get('/dishes', dishController.getAllDishes);
app.get('/dishes/:id', dishController.getDishById);
app.post('/dishes', dishController.createDish);
app.put('/dishes/:id', dishController.updateDish);
app.delete('/dishes/:id', dishController.deleteDish);

module.exports = app;
