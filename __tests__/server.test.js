const request = require('supertest');
const app = require('../server');

// test end to end
test('trouver le resto 1', async () => {
  const restaurantId = 3;
  const response = await request(app).get(`/restaurants/${restaurantId}`);
  console.log(response.body); 
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('Restaurant_name');
  expect(response.body).toHaveProperty('Restaurant_adresse');
  expect(response.body.Location_id).toBeDefined();
  expect(response.body.dishes).toBeDefined();
});

test('trouver le resto 2', async () => {
  const restaurantId = 2;
  const response = await request(app).get(`/restaurants/${restaurantId}`);
  console.log(response.body);
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('Restaurant_name');
  expect(response.body).toHaveProperty('Restaurant_adresse');
  expect(response.body.Location_id).toBeDefined();
  expect(response.body.dishes).toBeDefined();
});
