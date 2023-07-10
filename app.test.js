const request = require('supertest');
const app = require('./app');

describe('Shopping List API', () => {
  test('GET /items should return the list of shopping items', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([
      { name: 'popsicle', price: 1.45 },
      { name: 'cheerios', price: 3.40 }
    ]));
  });

  test('POST /items should add a new item to the shopping list', async () => {
    const newItem = { name: 'chocolate', price: 2.99 };
    const response = await request(app)
      .post('/items')
      .send(newItem);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ added: newItem });
  });

  test('GET /items/:name should return a specific item by name', async () => {
    const response = await request(app).get('/items/popsicle');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ name: 'popsicle', price: 1.45 });
  });

  test('PATCH /items/:name should update a specific item by name', async () => {
    const updatedItem = { name: 'new popsicle', price: 2.45 };
    const response = await request(app)
      .patch('/items/popsicle')
      .send(updatedItem);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ updated: updatedItem });
  });

  test('DELETE /items/:name should delete a specific item by name', async () => {
    const response = await request(app).delete('/items/cheerios');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Deleted' });
  });
});
