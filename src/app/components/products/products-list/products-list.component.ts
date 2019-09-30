import { Component, OnInit } from '@angular/core';

//IMPORTAR EL SERVICIO
import { ProductService } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';

//Importar Class Product
import { Product } from '../../../models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  productList : Product[];

  constructor(private ProductService : ProductService,
              private toastr : ToastrService
    ) { }

  ngOnInit() {
    this.ProductService.getProducts()
        .snapshotChanges()
        .subscribe(item =>{
          this.productList = []; // Se inicializa el array vacio
          item.forEach(element =>{
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            this.productList.push(x as Product);
          });
        });
  }

  onEdit(product : Product){
    //Se hace una copia del objeto, para evitar que al modificar el doble
    //enlace de datos lo muestre también en el list de objetos
    this.ProductService.selectedProduct = Object.assign({},product);
  }

  onDelete($key : string ){
     if (confirm('¿ Eliminar Elemento ?')) {
      this.ProductService.deleteProduct($key);
      this.toastr.success('Operacion Realizada con Exito','Producto Eliminado');
     }
  }

}
