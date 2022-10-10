const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  return db.end();
});

describe("GET", () => {
  test("200: Responds with an array of topic objects, each of which has the properties - 'slug', 'description'", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(Array.isArray(topics)).toBe(true);
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug", expect.any(String));
          expect(topic).toHaveProperty("description", expect.any(String));
        });
      });
  });
  test("should return 404 page not found for route that does not exist", () => {
    return request(app)
      .get("/api/notARoute")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("page not found");
      });
  });
});
