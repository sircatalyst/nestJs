import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async addProduct(
    // @Body() completeBody: {
    // 	title: string,
    // 	description: string,
    // 	price: number
    // }
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const output = await this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return output as Object;
  }

  @Get()
  async getAllProducts() {
   const products = await this.productService.getProducts();
   return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
	await this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
	return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string){
    await this.productService.deleteProduct(prodId);
    return  null;
  }
}
