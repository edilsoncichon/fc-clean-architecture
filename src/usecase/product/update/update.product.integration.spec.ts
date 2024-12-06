import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";
import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Integration test for product update use case", () => {
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
  const product = ProductFactory.create('a', 'product test', 99)
  const input = {
    id: product.id,
    name: "product updated",
    price: 10.59
  };

  it("should update a product", async () => {
    const repository = new ProductRepository();
    await repository.create(product);
    const useCase = new UpdateProductUseCase(repository);

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });
});
