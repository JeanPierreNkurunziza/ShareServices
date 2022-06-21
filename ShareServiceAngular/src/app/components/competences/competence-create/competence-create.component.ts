import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Competence } from 'src/app/models/competence.model';
import { CompetenceService } from 'src/app/_services/competence.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-competence-create',
  templateUrl: './competence-create.component.html',
  styleUrls: ['./competence-create.component.scss']
})
export class CompetenceCreateComponent implements OnInit {
  currentCompetence: Competence = {
    competence: '',
    image:'',
    Members:[],
   
  };
  FormCompetence!: FormGroup 
  isSuccessful = false;
  formFailed = false;
  errorMessage = '';
  imageURL?: string;
  uploadForm: FormGroup;

  constructor(private competenceservice : CompetenceService,
    private _builder:FormBuilder, public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,) {
          this.uploadForm = this.fb.group({
            avatar: [null],
            name: ['']
          });
         
   }
   
  ngOnInit(): void {
    this.FormCompetence = new FormGroup({
      competence: new FormControl(),
      image: new FormControl()
    // this.FormCompetence= this._builder.group({
    //   competence: ['', Validators.required],
    //   image:[null, Validators]
    // })
    })
  }
  submitForm(){
    let newCompetence: Competence={
      competence: this.FormCompetence.value['competence'],
      image: this.imageURL
    }
    // this.currentCompetence.competence= this.FormCompetence.value['competence']
    // this.currentCompetence.image=this.FormCompetence.value['image']
   
    this.competenceservice.create(newCompetence).subscribe({
      
        next: data => {
          console.log(data);
          if(this.isSuccessful = true){
            this.ngZone.run(() => this.router.navigateByUrl('/competences'))
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

showPreview(event:any) {
  const file = (event.target.files[0]);
    this.uploadForm.patchValue({
      avatar: file
        });
    this.uploadForm.updateValueAndValidity()
  // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;

        this.currentCompetence.image=this.imageURL;
        console.log(this.currentCompetence);
      }
  reader.readAsDataURL(file)
}

}
