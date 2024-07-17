const request = require('supertest');
require('dotenv').config();
const app = require('../app.js');
const { Restaurant, Dish, Location } = require('../models'); 

jest.mock('../models', () => {
  const mockRestaurant = {
    Restaurant_id: 1,
    Restaurant_name: 'Test Restaurant',
    Restaurant_adresse: '123 Test Street',
    Location_id: 1,
    dishes: [],
    location: {}
  };

  return {
    Restaurant: {
      findByPk: jest.fn().mockResolvedValue(mockRestaurant),
      findAll: jest.fn().mockResolvedValue([mockRestaurant])
    },
    Dish: {
      findAll: jest.fn().mockResolvedValue([]),
      create: jest.fn()
    },
    Location: {
      findByPk: jest.fn().mockResolvedValue({})
    }
  };
});

describe('GET /restaurants/:id', () => {
  it('should find the restaurant with id 1', async () => {
    const restaurantId = 1;
    const response = await request(app).get(`/restaurants/${restaurantId}`);
    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('Restaurant_name');
    expect(response.body).toHaveProperty('Restaurant_adresse');
    expect(response.body).toHaveProperty('Location_id');
    expect(response.body).toHaveProperty('dishes');
  });
});
