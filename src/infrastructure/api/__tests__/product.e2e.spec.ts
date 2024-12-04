import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Product One",
        price: 99.99
      });

    expect(response.status).toBe(200);
    const response2 = await request(app)
      .post("/product")
      .send({
          type: "a",
          name: "Product Two",
          price: 10.99
        });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe("Product One");
    expect(product.price).toBe(99.99);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product Two");
    expect(product2.price).toBe(10.99);

    const listResponseXML = await request(app)
      .get("/product")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Product One</name>`);
    expect(listResponseXML.text).toContain(`<price>99.99</price>`);
    expect(listResponseXML.text).toContain(`<name>Product Two</name>`);
    expect(listResponseXML.text).toContain(`<price>10.99</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });
});
