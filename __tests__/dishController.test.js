const request = require('supertest');
require('dotenv').config();

process.env.NODE_ENV = 'test'; // Definir NODE_ENV à 'test' avant d'importer l'application

const app = require('../app');
const { Restaurant, Dish } = require('../models');

jest.mock('../models');

describe('POST /dishes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new dish and return 201 status', async () => {
    const mockRestaurant = {
      Restaurant_id: 1,
      Restaurant_name: 'Test Restaurant',
    };

    const mockDish = {
      Dish_id: 1,
      Dish_name: 'kid menu',
      Dish_description: 'croustibat caviar',
      Dish_price: 10.99,
      Dish_Date: new Date(),
      Restaurant_id: 1,
    };

    Restaurant.findByPk.mockResolvedValueOnce(mockRestaurant);
    Dish.create.mockResolvedValueOnce(mockDish);

    const res = await request(app).post('/dishes').send({
      Dish_name: 'kid menu',
      Dish_description: 'croustibat caviar',
      Dish_price: 10.99,
      Dish_Date: new Date(),
      Restaurant_id: 1,
    });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(expect.objectContaining({
      Dish_id: 1,
      Dish_name: 'kid menu',
      Dish_description: 'croustibat caviar',
      Dish_price: 10.99,
      Dish_Date: expect.any(String),
      Restaurant_id: 1,
    }));
  });
});
