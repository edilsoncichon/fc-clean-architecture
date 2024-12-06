import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Integration Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const repository = new ProductRepository();
    const usecase = new FindProductUseCase(repository);

    const product = ProductFactory.create('a', 'Lubrificante KY', 39.5)

    await repository.create(product);

    const output = {
      id: product.id,
      name: product.name,
      price: product.price
    };

    const result = await usecase.execute({id: product.id});

    expect(result).toEqual(output);
  });
});
