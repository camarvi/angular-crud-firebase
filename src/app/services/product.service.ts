import { Injectable } from '@angular/core';

//Importar modulos de Firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Product } from '../models/product'

@Injectable()
//  {
//  providedIn: 'root'
//}
//)
export class ProductService {

  public productList : AngularFireList<any>;
  public selectedProduct : Product = new Product();  //seleccionar temporalmente el dato seleccionado

  constructor(private firebase: AngularFireDatabase) { }

  getProducts() {
    return this.productList = this.firebase.list('products');
  }

  insertProduct(product : Product){
    this.productList.push({
      name: product.name,
      category : product.category,
      location : product.location,
      price : product.price
    });
  }

  updateProduct(product : Product){
    this.productList.update(product.$key, {
      name: product.name,
      category : product.category,
      location : product.location,
      price : product.price
    });

  }

  deleteProduct($key : string){
    this.productList.remove($key);
  }

}
