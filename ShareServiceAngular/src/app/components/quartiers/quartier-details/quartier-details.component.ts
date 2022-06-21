import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quartier } from 'src/app/models/quartier.model';
import { QuartierService } from 'src/app/_services/quartier.service';

@Component({
  selector: 'app-quartier-details',
  templateUrl: './quartier-details.component.html',
  styleUrls: ['./quartier-details.component.scss']
})
export class QuartierDetailsComponent implements OnInit {

  isSuccessful = false;
  formFailed = false;
  currentQuartier: Quartier = {
    quartier: '',
    codePostale:0,
    localite:'',
   
  };
  message = '';
  constructor(private quartierservice: QuartierService,
    private route: ActivatedRoute,
    private router: Router, private httpClient: HttpClient, public fb: FormBuilder,
    private ngZone: NgZone,) { 
     
    }
  ngOnInit(): void {
    this.message = '';
    this.getQuartier(this.route.snapshot.params['id']);
  }
  getQuartier(id: string): void {
    this.quartierservice.get(id)
      .subscribe({
       next: data => {
          this.currentQuartier = data;
          console.log(data);
        },
       error: error => {
          console.log(error);
        }});
  }
 
  updateQuartier(): void {
    this.message = '';
    
    this.quartierservice.update(this.currentQuartier.id, this.currentQuartier)
      .subscribe({
        next :response => {
           console.log(response.message); 
           if(this.isSuccessful = true){
            this.ngZone.run(() => this.router.navigateByUrl('/quartiers'))
            this.message = 'This user was updated successfully!';         
            } 
          this.formFailed = false
         
        },
       error: error => {
          this.message = error.error.message;
          // this.message = JSON.parse(error.error).message;
          this.formFailed = true;
        }});
  }
  reloadPage():void{
    window.location.reload();
  }
  
}
