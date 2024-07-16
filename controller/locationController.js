const { Location } = require('../models');

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findByPk(id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLocation = async (req, res) => {
  const { Location_latitude, Location_longitude } = req.body;

  try {
    const newLocation = await Location.create({
      Location_latitude,
      Location_longitude,
    });

    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { Location_latitude, Location_longitude } = req.body;
  try {
    const updatedLocation = await Location.update(
      {
        Location_latitude,
        Location_longitude,
      },
      {
        where: {
          Location_id: id,
        },
      }
    );
    if (updatedLocation[0] === 0) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json({ message: 'Location updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLocation = await Location.destroy({
      where: {
        Location_id: id,
      },
    });
    if (deletedLocation === 0) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
};
