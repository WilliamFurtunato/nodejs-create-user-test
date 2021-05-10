import app from "./app";

import request from "supertest";

afterEach(async () => {
  await request(app).get("/dropAllUsers");
});

beforeEach(async () => {
  await request(app).get("/dropAllUsers");
});

describe("Post /user", () => {
  it("Should returns a created user", async () => {
    const user = {
      name: "William",
      email: "william@email.com",
      cpf: "123456",
    };

    await request(app)
      .post("/user")
      .send(user)
      .set("Accept", "application/json")
      .expect(200, {
        name: "William",
        email: "william@email.com",
        cpf: "123456",
      });
  });

  it("Should not create a user with duplicate cpf", async () => {
    const user = {
      name: "Furtunato",
      email: "furtunato@email.com",
      cpf: "456789",
    };

    await request(app)
      .post("/user")
      .send(user)
      .set("Accept", "application/json")
      .expect(200, {
        name: "Furtunato",
        email: "furtunato@email.com",
        cpf: "456789",
      });

    await request(app)
      .post("/user")
      .send(user)
      .set("Accept", "application/json")
      .expect(400);
  });
});

describe("GET /user", () => {
  it("Should returns a list of users", async () => {
    await request(app).get("/user").expect(200, "[]");
  });
});

describe("Update /user/:cpf", () => {
  it("Should returns a updated user", async () => {
    const user = {
      name: "William",
      email: "william@email.com",
      cpf: "123456",
    };

    const updatedUser = {
      name: "William Furtunato da Silva",
      email: "williamfurtunato@email.com",
      cpf: "123456",
    };

    await request(app).post("/user").send(user);

    await request(app)
      .put("/user/123456")
      .send(updatedUser)
      .set("Accept", "application/json")
      .expect(200, {
        name: "William Furtunato da Silva",
        email: "williamfurtunato@email.com",
        cpf: "123456",
      });
  });
});

describe("Delete /user/:cpf", () => {
  it("Should remove user and returns status 200", async () => {
    const user = {
      name: "William",
      email: "william@email.com",
      cpf: "123456",
    };
    await request(app)
      .post("/user")
      .send(user)
      .set("Accept", "application/json")
      .expect(200);

    await request(app).delete("/user/123456").expect(200);
  });

  it("Should returns a list of remanascents user", async () => {
    const firstUser = {
      name: "William",
      email: "william@email.com",
      cpf: "123456",
    };

    const secondUser = {
      name: "Furtunato",
      email: "furtunato@email.com",
      cpf: "456789",
    };

    const thirdUser = {
      name: "Silva",
      email: "silva@email.com",
      cpf: "789123",
    };

    await request(app)
      .post("/user")
      .send(firstUser)
      .set("Accept", "application/json")
      .expect(200);

    await request(app)
      .post("/user")
      .send(secondUser)
      .set("Accept", "application/json")
      .expect(200);

    await request(app)
      .post("/user")
      .send(thirdUser)
      .set("Accept", "application/json")
      .expect(200);

    const remainingUsers = [firstUser, thirdUser];
    await request(app).delete("/user/456789").expect(200, remainingUsers);
  });

  it("Should returns error if user does not exist when delete user", async () => {
    await request(app).delete("/user/123456").expect(200);
  });
});

describe("GET /user/:cpf", () => {
  it("Should returns especific user", async () => {
    const user = {
      name: "William",
      email: "william@email.com",
      cpf: "123456",
    };

    await request(app)
      .post("/user")
      .send(user)
      .set("Accept", "application/json")
      .expect(200, {
        name: "William",
        email: "william@email.com",
        cpf: "123456",
      });

    await request(app).get("/user/123456").expect(200, user);
  });
});
