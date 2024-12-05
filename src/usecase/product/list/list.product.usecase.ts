import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {InputListProductDto, OutputListProductDto} from "./list.product.dto";
import ProductInterface from "../../../domain/product/entity/product.interface";

export default class ListProductUseCase {
  constructor(private repository: ProductRepositoryInterface) {}

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.repository.findAll();
    return OutputMapper.toOutput(products);
  }
}

class OutputMapper {
  static toOutput(product: ProductInterface[]): OutputListProductDto {
    return {
      products: product.map((_product) => ({
        id: _product.id,
        name: _product.name,
        price: _product.price,
      })),
    };
  }
}
