import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Competence } from 'src/app/models/competence.model';
import { CompetenceService } from 'src/app/_services/competence.service';

@Component({
  selector: 'app-competence-list',
  templateUrl: './competence-list.component.html',
  styleUrls: ['./competence-list.component.scss']
})
export class CompetenceListComponent implements OnInit {

  p: number = 1;
  total: number = 0;
  competences?: any;
  currentCompetence: Competence = {};
  currentIndex = -1;
  competence?:string;
  message=''
  constructor(private competenceservice : CompetenceService,
    private router: Router,
    private ngZone: NgZone,) { }

  ngOnInit(): void {

    this.retrieveCompetences();
  }
  pageChangeEvent(event: number){
    this.p = event;
    this.retrieveCompetences();
   }
  retrieveCompetences(): void {
    this.competenceservice.getAllCompetences(this.p).subscribe
    ({ next :
      (data:any) => {
        this.competences =data;
        this.total = data.total;
        console.log(data);
      },
      error : error => {
        console.log(error);
      }});
  }
  refreshList(): void {
    this.retrieveCompetences();
  }
  searchCompetence(): void {
    
    this.currentCompetence = {};
    this.currentIndex = -1;
    this.competenceservice.findByName(this.competence)
      .subscribe({ next :
        data => {
         this.competences  = data;
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }
  setActiveCompetence(competence: Competence, index: number): void {
    this.currentCompetence = competence;
    this.currentIndex = index;
  }
  removeCompetence(i:any): void {
    if(window.confirm('Do you want to go ahead and delete? ')){
      this.competenceservice.delete(this.currentCompetence.id)
      .subscribe({
         
       next :response => {
          console.log(response.message);
          
         this.message = 'This user was deleted successfully!';     
       },
      error: error => {
         
         this.message = JSON.parse(error.error).message;
        
       }});
       
    }
     
  }

}
