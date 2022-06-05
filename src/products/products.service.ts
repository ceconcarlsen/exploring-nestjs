import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    products: Product[];
    

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price)
        this.products.push(newProduct);
        return prodId; 
    }

    getProducts(){
        return [...this.products];
    }

    getSingleProduct(prodId: string){
        const product = this.findProduct(prodId)[0];
        return {...product};
     }   

    updateProduct(productId: string, title: string, desc: string, price: number ){
        const [product, index] = this.findProduct(productId); 
        const updatedProduct = {...product}
        if(title){
            updatedProduct.title = title
        } 
        if(desc){
            updatedProduct.description = desc
        }
        if(price){
            updatedProduct.price = price
        }
        this.products[index] = updatedProduct
    }

    deleteProduct(prodId: string){
        const [_, index] = this.findProduct(prodId)

        this.products.splice(index, 1);  
    }

    //Helper func
    private findProduct(prodId: string): [Product, number]{
        const productindex = this.products.findIndex((product) => product.id === prodId);
        const product = this.products[productindex]
        if(!product){
            throw new NotFoundException('Could not find product.');
        }
        return [product, productindex];
    }
}