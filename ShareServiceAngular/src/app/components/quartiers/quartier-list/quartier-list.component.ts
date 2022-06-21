import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quartier } from 'src/app/models/quartier.model';
import { QuartierService } from 'src/app/_services/quartier.service';

@Component({
  selector: 'app-quartier-list',
  templateUrl: './quartier-list.component.html',
  styleUrls: ['./quartier-list.component.scss']
})
export class QuartierListComponent implements OnInit {

  quartiers?: Quartier[];
  currentQuartier: Quartier = {};
  currentIndex = -1;
  quartier?:string;
  message=''
  constructor(private quartierservice : QuartierService,
    private router: Router,
    private ngZone: NgZone,) { }

  ngOnInit(): void {

    this.retrieveQuartiers();
  }
  retrieveQuartiers(): void {
    this.quartierservice.getAll().subscribe
      ({ next :
        data => {
          this.quartiers = data;
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }
  refreshList(): void {
    this.retrieveQuartiers();
  }
  searchQuartier(): void {
    
    this.currentQuartier = {};
    this.currentIndex = -1;
    this.quartierservice.getQuartierId(this.quartier)
      .subscribe({ next :
        data => {
         this.quartiers  = data;
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }
  setActiveQuartier(quartier: Quartier, index: number): void {
    this.currentQuartier = quartier;
    this.currentIndex = index;
  }
  removeQuartier(i:any): void {
    if(window.confirm('Do you want to go ahead and delete? ')){
      this.quartierservice.delete(this.currentQuartier.id)
      .subscribe({
         
       next :response => {
          console.log(response.message);
          
         this.message = 'This quartier was deleted successfully!';     
       },
      error: error => {
         
         this.message = JSON.parse(error.error).message;
        
       }});
       
    }
     
  }

}
