const { Restaurant, Dish, Location } = require('../models'); // Import correct des modèles

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findByPk(id, {
      include: [
        {
          model: Dish,
          as: 'dishes',
        },
        {
          model: Location,
          as: 'location',
        },
      ],
    });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRestaurant = async (req, res) => {
  const { Restaurant_name, Restaurant_adresse, Location_latitude, Location_longitude } = req.body;

  try {
    // Créer la localisation
    const newLocation = await Location.create({
      Location_latitude,
      Location_longitude,
    });

    // Créer le restaurant en utilisant l'ID de la localisation créée
    const newRestaurant = await Restaurant.create({
      Restaurant_name,
      Restaurant_adresse,
      Location_id: newLocation.Location_id, // Utilisation de l'ID de la localisation créée
    });

    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { Restaurant_name, Restaurant_adresse, Location_id } = req.body;
  try {
    const updatedRestaurant = await Restaurant.update(
      {
        Restaurant_name,
        Restaurant_adresse,
        Location_id,
      },
      {
        where: {
          Restaurant_id: id,
        },
      }
    );
    if (updatedRestaurant[0] === 0) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json({ message: 'Restaurant updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRestaurant = await Restaurant.destroy({
      where: {
        Restaurant_id: id,
      },
    });
    if (deletedRestaurant === 0) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
