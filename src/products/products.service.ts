import { Injectable, NotFoundException } from "@nestjs/common";
import { IProduct, Product } from "./product.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {
      constructor (@InjectModel('Product') private readonly productModel: Model<IProduct>){
    }

   async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({title, description: desc, price: price})
    const result = await newProduct.save();
    return result.id as String;
    }

    async getProducts(){
        const products = await this.productModel.find().exec()
        return products.map((product) => (
            {
                id: product._id,
                title: product.title,
                description: product.description,
                price: product.price
            })
         );
    }

    async getSingleProduct(prodId: string){
        const product = await this.findProduct(prodId);
        return {id: product.id, title: product.title, description: product.description, price: product.price};
     }   
 
    async updateProduct(productId: string, title: string, desc: string, price: number ){
        const updatedProduct = await this.findProduct(productId);
        if(title){
            updatedProduct.title = title
        } 
        if(desc){
            updatedProduct.description = desc
        }
        if(price){
            updatedProduct.price = price
        }
        updatedProduct.save();
    }

    async deleteProduct(prodId: string){
        const result = await this.productModel.deleteOne({_id: prodId}).exec()
        console.log(result)
        if(result.deletedCount === 0){
            throw new NotFoundException('Could not find product.');
        }
    }

    //Helper func
    private async findProduct(prodId: string): Promise<IProduct>{
        let product;
        try {
            product = await this.productModel.findById(prodId)
        }
        catch(error){
            throw new NotFoundException('Could not find product.');
        }
        if(!product){
            throw new NotFoundException('Could not find product.');
        }
        return product;
    }
}