import { Component, OnInit } from '@angular/core';
import { ApiExternaService } from '../services/api-externa/api-externa.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Personaje } from '../services/personajes/Personaje';
import { PersonajesService } from '../services/personajes/personajes.service';

@Component({
  selector: 'app-disney-api',
  templateUrl: './disney-api.component.html',
  styleUrls: ['./disney-api.component.css'],
  	// add NgbModalConfig and NgbModal to the component providers
	providers: [NgbModalConfig, NgbModal],
})
export class DisneyApiComponent implements OnInit {

  public data: any;
  public currentPage: number = 1;
  public pageSize: number = 10;
  public collectionSize!: number;

  public personajeSelected!: Personaje;

  public personajesBD: Personaje[] = [];
  public currentPagePersonajesDB: number = 1;
  public pageSizePersonajesBD: number = 10;
  public collectionSizePersonajesBD!: number;

  constructor(private apiExternaService: ApiExternaService,
    private personajesServices: PersonajesService,
    config: NgbModalConfig, private modalService: NgbModal) {
      config.size = 'lg'
    }

  async ngOnInit(): Promise<void> {
    await this.loadPagination();

    await this.loadPersonajes();
  }

  public async loadPagination(): Promise<void> {
    await this.apiExternaService.getPagination(this.currentPage,  this.pageSize).toPromise()
    .then( (response) => {
      console.log('response', response);
      this.data = response.data;
      this.collectionSize = response.info.totalPages * this.pageSize;
    })
    .catch( (error) => {
      console.error(error);
    });
  }

  public pagination(): void {
    this.loadPagination();
  }

  public infoPersonaje(content: any, personaje: any): void {
    this.personajeSelected = new Personaje();

    this.personajeSelected.nombre = personaje.name;
    this.personajeSelected.tvShow = personaje.tvShows[0] == undefined ? "" : personaje.tvShows[0] ;
    this.personajeSelected.apiId = personaje._id;
    this.personajeSelected.foto = personaje.imageUrl;

    this.modalService.open(content);

  }

  public closeModal(): void {
    this.personajeSelected = new Personaje();
    this.modalService.dismissAll();
  }

  public guardarPersonaje(): void {
    this.personajesServices.savePersonaje(this.personajeSelected).toPromise()
    .then( (response) => {
      console.log(response);
      this.loadPersonajes();
    })
    .catch( (error) => {
      console.error(error);
    });
    this.closeModal();
  }

  public async loadPersonajes(): Promise<void> {
    await this.personajesServices.getPagination(this.currentPagePersonajesDB - 1, this.pageSizePersonajesBD).toPromise()
    .then( (response) => {
      console.log(response);
      this.personajesBD = response.data;
      this.collectionSizePersonajesBD = response.totalPages * this.pageSizePersonajesBD;
    })
    .catch( (error) => {
      console.error(error);
    });
  }

  public paginationPersonajes(): void {
    this.loadPersonajes();
  }

  public updatePersonaje(content: any, personaje: any): void {
    this.personajeSelected = {...personaje};
    this.modalService.open(content);
  }

}
