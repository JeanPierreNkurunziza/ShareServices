import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Quartier } from 'src/app/models/quartier.model';
import { QuartierService } from 'src/app/_services/quartier.service';

@Component({
  selector: 'app-quartier-create',
  templateUrl: './quartier-create.component.html',
  styleUrls: ['./quartier-create.component.scss']
})
export class QuartierCreateComponent implements OnInit {

  currentQuartier: Quartier = {
    quartier: '',
    codePostale:0,
    localite:'',
   
  };
  FormQuartier!: FormGroup 
  isSuccessful = false;
  formFailed = false;
  errorMessage = '';

  constructor(private quartierservice : QuartierService,
    private _builder:FormBuilder, public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,) { }
   
  ngOnInit(): void {
    this.FormQuartier = new FormGroup({
      quartier: new FormControl(),
      codePostale: new FormControl(),
      localite: new FormControl()
    
    })
  }
  submitForm(){
    let newQuartier: Quartier={
      quartier: this.FormQuartier.value['quartier'],
      codePostale: this.FormQuartier.value['codePostale'],
      localite: this.FormQuartier.value['localite']
     
    }
    this.quartierservice.create(newQuartier).subscribe({
      
        next: data => {
          console.log(data);
          if(this.isSuccessful = true){
            this.ngZone.run(() => this.router.navigateByUrl('/quartiers'))
          }
         // this.isSuccessful = true;
          this.formFailed = false;
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.formFailed = true;
        }
    })
  }


}

