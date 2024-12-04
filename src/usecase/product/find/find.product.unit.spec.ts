import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product('123', 'Cinto De Castidade Aço Inox', 799.99);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const repository = MockRepository();
    const useCase = new FindProductUseCase(repository);

    const output = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    const result = await useCase.execute({id: "1234"});

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const repository = MockRepository();
    repository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const useCase = new FindProductUseCase(repository);

    await expect(() => {
      return useCase.execute({id: '404'});
    }).rejects.toThrowError("Product not found");
  });
});
