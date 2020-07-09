import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
	});
	const result = await newProduct.save();
    return result;
  }

  async getProducts() {
	const products = this.productModel.find().exec();
    return products;
  }

 async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return product;
  }

  async updateProduct(productId: string, title: string, desc: string, price: number) {
	const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (title) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
	const result = await this.productModel.deleteOne({_id: prodId}).exec();
	if (result.n === 0) {
		throw new NotFoundException('Could not find product');
	}
  }

  private async findProduct(id: string): Promise<Product> {
	let product;
	try {
		product = await this.productModel.findById(id);
	} catch (error) {
		throw new NotFoundException('Could not find product');
	}

    if (!product) {
      throw new NotFoundException('Could not find product');
	}
	return product;
  }
}
