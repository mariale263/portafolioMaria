import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  constructor( private http: HttpClient ) {
        // Leer el archivo json
    this.http.get('assets/data/data-pagina.json')
    .subscribe( resp => {
      console.log(resp);
    });
  }
}
