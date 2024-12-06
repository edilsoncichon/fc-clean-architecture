import CreateProductUseCase from "./create.product-use-case";
import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Integration tests for create product use case", () => {
  const input = {
    type: "a",
    name: "product test",
    price: 99.99,
  };
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const useCase = new CreateProductUseCase(new ProductRepository());

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const useCase = new CreateProductUseCase(new ProductRepository());

    input.name = "";

    await expect(useCase.execute(input)).rejects.toThrowError("Name is required");
  });

  it("should thrown an error when price is invalid", async () => {
    const useCase = new CreateProductUseCase(new ProductRepository());

    input.name = 'product test';
    input.price = -100;

    await expect(useCase.execute(input)).rejects.toThrowError("Price must be greater than zero");
  });
});
