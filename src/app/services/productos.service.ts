import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/productos.service';
import { promise } from 'protractor';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

   }

   private cargarProductos() {

    return new Promise( ( resolve ) => {

      this.http.get('https://angular-html-24b0d.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          console.log(resp);
          this.productos = resp;
          // this.cargando = false;

          setTimeout(() => {  // opcional ya q ya sabemos que el loading funciona
            this.cargando = false;
            resolve();
          }, 1000);
        });
    });
   }

   getProducto( id: string ) {
     return this.http.get(`https://angular-html-24b0d.firebaseio.com/productos/${ id }.json`);

   }

   buscarProducto( termino: string ) {

    if ( this.productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then( () => {
        // ejecuta despues de tener los productos
        // aplicar filtro
        this.filtrarProductos( termino );
      });

    } else {
      // aplicar el filtro
      this.filtrarProductos( termino );
    }

   }

   private filtrarProductos( termino: string ) {
     // console.log(this.productos);
     this.productosFiltrado = [];

     termino = termino.toLocaleLowerCase();

     this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf ( termino ) >= 0 ) {
        this.productosFiltrado.push( prod );
      }

     });

   }

}
