import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
// Importar service

import { ProductService } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';

// Importar Product Class
import { Product } from '../../../models/product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService,
              private toastr : ToastrService
    ) { }

  ngOnInit() {
    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm : NgForm){
    if (productForm.value.$key == null){
      this.productService.insertProduct(productForm.value);
      this.toastr.success('Operacion Realizada con exito','Producto Almacenado');
    } else {
      this.productService.updateProduct(productForm.value);
      this.toastr.success('Operacion Realizada con exito','Producto Modificado');
    }

    this.resetForm(productForm);
  }

  resetForm(productForm? : NgForm){
    if (productForm != null){
      productForm.reset();
      this.productService.selectedProduct = new Product();
    }

  }
}
