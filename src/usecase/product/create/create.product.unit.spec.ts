import CreateProductUseCase from "./create.product-use-case";

const input = {
  type: "a",
  name: "product test",
  price: 99.99,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const useCase = new CreateProductUseCase(MockRepository());

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const useCase = new CreateProductUseCase(MockRepository());

    input.name = "";

    await expect(useCase.execute(input)).rejects.toThrowError("Name is required");
  });

  it("should thrown an error when price is invalid", async () => {
    const useCase = new CreateProductUseCase(MockRepository());

    input.name = 'product test';
    input.price = -100;

    await expect(useCase.execute(input)).rejects.toThrowError("Price must be greater than zero");
  });
});
