const request = require('supertest');
const { app, server } = require('../index');
const mongoose = require('mongoose');
const News = require('../models/newsModel'); 

// Connect to a test database before running tests
beforeAll(async () => {
  const url = "mongodb+srv://eskandertaher:wyDfmmc6eerTU81O@cluster0.fk9njl5.mongodb.net/uust_smu"
  await mongoose.connect(url);
});

// Clear the test database after each test
afterEach(async () => {
  await News.deleteMany();
});

// Disconnect from the database and close the server after all tests are done
afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('News API', () => {
  test('should create a news item', async () => {
    const response = await request(app)
      .post('/api/news')
      .send({
        title: 'Test News Title',
        content: 'Test News Content',
        createdBy: '60d0fe4f5311236168a109ca', // Example user ID,
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test News Title');
    expect(response.body.content).toBe('Test News Content');
  });

  test('should get all news items', async () => {
    await News.create({
      title: 'Test News Title',
      content: 'Test News Content',
      createdBy: '60d0fe4f5311236168a109ca', // Example user ID, adjust as necessary
    });

    const response = await request(app).get('/api/news');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe('Test News Title');
  });

  test('should get a single news item by ID', async () => {
    const newsItem = await News.create({
      title: 'Test News Title',
      content: 'Test News Content',
      createdBy: '60d0fe4f5311236168a109ca', // Example user ID, adjust as necessary
    });

    const response = await request(app).get(`/api/news/${newsItem._id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Test News Title');
  });

  test('should update a news item', async () => {
    const newsItem = await News.create({
      title: 'Test News Title',
      content: 'Test News Content',
      createdBy: '60d0fe4f5311236168a109ca', // Example user ID, adjust as necessary
    });

    const response = await request(app)
      .put(`/api/news/${newsItem._id}`)
      .send({
        title: 'Updated Test News Title',
        content: 'Updated Test News Content',
        createdBy: '60d0fe4f5311236168a109ca', // Ensure this matches the schema
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Test News Title');
    expect(response.body.content).toBe('Updated Test News Content');
  });

  test('should delete a news item', async () => {
    const newsItem = await News.create({
      title: 'Test News Title',
      content: 'Test News Content',
      createdBy: '60d0fe4f5311236168a109ca', // Example user ID, adjust as necessary
    });

    const response = await request(app).delete(`/api/news/${newsItem._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('News item deleted successfully');
  });
});

