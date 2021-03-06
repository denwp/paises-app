import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent{


  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor( private paisService: PaisService) { }


  buscar( termino: string){
    this.termino = termino;
    this.paises = [];
    this.hayError = false;
    console.log(this.termino);
    this.paisService.buscarCapital(this.termino).subscribe(
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

  sugerencias(event : any){
    this.hayError = false;
    
  }
}
