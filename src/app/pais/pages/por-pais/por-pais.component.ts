import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
  li{
    cursor:pointer;
  }
  `
  ]
})
export class PorPaisComponent{
  mostrarSugerencias: boolean = false;
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  constructor( private paisService: PaisService) { }

  buscar( termino: string){
    this.mostrarSugerencias = false;
    this.termino = termino;
    this.paises = [];
    this.hayError = false;
    console.log(this.termino);
    this.paisService.buscarPais(this.termino).subscribe(
      (paises) => {
        this.paises = paises;
        console.log(paises);
      }, (err) => {
        this.hayError = true;
        this.paises = [];
        console.log('Error');
        console.info(err);
      }
    );
  }

  sugerencias(termino : any){
    this.mostrarSugerencias = true;
    this.termino = termino;
    this.paisService.buscarPais(termino)
    .subscribe(paises => this.paisesSugeridos = paises.splice(0,5),
              err => this.paisesSugeridos = []);
    this.hayError = false;

  }

  buscarSugerido(termino: string){
    this.buscar(termino);

  }
}
