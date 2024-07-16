const { Restaurant, Dish } = require('../models');

const createDish = async (req, res) => {
  const { Dish_name, Dish_description, Dish_price, Dish_Date, Restaurant_id } = req.body;

  try {
    const restaurant = await Restaurant.findByPk(Restaurant_id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const newDish = await Dish.create({
      Dish_name,
      Dish_description,
      Dish_price,
      Dish_Date,
      Restaurant_id,
    });

    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.findAll();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDishById = async (req, res) => {
  const { id } = req.params;
  try {
    const dish = await Dish.findByPk(id);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDish = async (req, res) => {
  const { id } = req.params;
  const { Dish_name, Dish_description, Dish_price, Dish_Date } = req.body;
  try {
    const updatedDish = await Dish.update(
      {
        Dish_name,
        Dish_description,
        Dish_price,
        Dish_Date,
      },
      {
        where: {
          Dish_id: id,
        },
      }
    );
    if (updatedDish[0] === 0) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json({ message: 'Dish updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDish = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDish = await Dish.destroy({
      where: {
        Dish_id: id,
      },
    });
    if (deletedDish === 0) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDishes,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
};
