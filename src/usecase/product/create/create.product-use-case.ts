import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {InputCreateProductDto, OutputCreateProductDto} from "./create.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";

export default class CreateProductUseCase {
  constructor(private repository: ProductRepositoryInterface) {}

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(
        input.type,
        input.name,
        input.price,
    );

    await this.repository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
