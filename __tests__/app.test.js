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

describe("GET /api/topics", () => {
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

describe("GET /api/articles/:article_id", () => {
  test(`200: /api/articles/:article_id - 
    Responds with an article object, that has the following properties:
        "author" which is the "username" from the users table
        "title"
        "article_id"
        "body"
        "topic"
        "created_at"
        "votes"`, () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
          })
        );
      });
  });
  test(`404: /api/articles/:article_id - if article_id is valid but it doesn't exist in database`, () => {
    return request(app)
      .get("/api/articles/999999999")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("article not found");
      });
  });
  test(`400: /api/articles/:article_id - invalid article_id`, () => {
    return request(app)
      .get("/api/articles/notAnId")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("bad request");
      });
  });
});

describe("GET /api/users", () => {
  test(`200: Responds with an array of user objects, each user object should have the following property: username, name avatar_url`, () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(Array.isArray(users)).toBe(true);
        expect(users.length > 0).toBe(true);
        users.forEach((user) => {
          expect(user).toHaveProperty("username", expect.any(String));
          expect(user).toHaveProperty("name", expect.any(String));
          expect(user).toHaveProperty("avatar_url", expect.any(String));
        });
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test(`200: responds with a modified article with votes updated accordingly (increments the votes)`, () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 5 })
      .expect(200)
      .then(({ body }) => {
        const { updatedArticle } = body;
        expect(updatedArticle.votes).toBe(105);
      });
  });
  test(`200: responds with a modified article with votes updated accordingly with negative number (decrements the votes)`, () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -5 })
      .expect(200)
      .then(({ body }) => {
        const { updatedArticle } = body;
        expect(updatedArticle.votes).toBe(95);
      });
  });
  test(`200: responds with a modified article with votes updated accordingly and returns updated article`, () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 5 })
      .expect(200)
      .then(({ body }) => {
        const { updatedArticle } = body;
        expect(updatedArticle).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 105,
          })
        );
      });
  });
  test(`404: returns an error message if the article_id doesn't exist in the database but is valid`, () => {
    return request(app)
      .patch(`/api/articles/9999999`)
      .send({ inc_votes: 100 })
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe(`Article not found`);
      });
  });
  test(`400: returns an error message if the user has made a bad request`, () => {
    return request(app)
      .patch(`/api/articles/penthouse`)
      .send({ inc_votes: 100 })
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe(`bad request`);
      });
  });
  test(`400: returns an error message if the user has made a bad request by not providing correct data type in the vote object`, () => {
    return request(app)
      .patch(`/api/articles/penthouse`)
      .send({ inc_votes: "oneHundred" })
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe(`bad request`);
      });
  });
  test(`400: returns an error message if the user has made a bad request by not providing correct key name in the vote object`, () => {
    return request(app)
      .patch(`/api/articles/penthouse`)
      .send({ inc_vote: 100 })
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe(`bad request`);
      });
  });
});
