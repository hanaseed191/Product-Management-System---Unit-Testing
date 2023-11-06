const request = require('supertest');
const express = require('express');
const app = require('./index'); 

describe('API Endpoints', () => {
  it('GET /products should return all products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /products/:id should return a single product', async () => {
    const res = await request(app).get('/products/1'); 
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(1);
  });

  it('GET /products/:id should return 404 for a non-existent product', async () => {
    const res = await request(app).get('/products/999'); 
    expect(res.statusCode).toEqual(404);
  });

  it('POST /products should create a new product', async () => {
    const newProduct = {
      name: 'New Product',
      category: 'Test',
      price: 50,
      stock: 20,
    };

    const res = await request(app)
      .post('/products')
      .send(newProduct);

    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBeDefined(); 
  });

  it('PUT /products/:id should update a product', async () => {
    const updatedProduct = {
      name: 'Updated Product',
      category: 'Updated Category',
      price: 75,
      stock: 15,
    };

    const res = await request(app)
      .put('/products/1') 
      .send(updatedProduct);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(updatedProduct.name);
  });

  it('DELETE /products/:id should delete a product', async () => {
    const res = await request(app).delete('/products/1'); 
    expect(res.statusCode).toEqual(200);
  });

  it('DELETE /products/:id should return 404 for a non-existent product', async () => {
    const res = await request(app).delete('/products/999'); 
    expect(res.statusCode).toEqual(404);
  });
});
