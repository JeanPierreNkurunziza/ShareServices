import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competence } from 'src/app/models/competence.model';
import { CompetenceService } from 'src/app/_services/competence.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-competence-details',
  templateUrl: './competence-details.component.html',
  styleUrls: ['./competence-details.component.scss']
})

export class CompetenceDetailsComponent implements OnInit {
  imageURL?: string;
  uploadForm: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  
  currentCompetence: Competence = {
    competence: '',
    image:'',
    Members:[],
   
  };
 
  message = '';


  constructor(private competenceservice: CompetenceService,
    private route: ActivatedRoute,
    private router: Router, private httpClient: HttpClient, public fb: FormBuilder) { 
      this.uploadForm = this.fb.group({
        avatar: [null],
        name: ['']
      })
    }

  ngOnInit(): void {
    this.message = '';
    this.getCompetence(this.route.snapshot.params['id']);
  }
  getCompetence(id: string): void {
    this.competenceservice.get(id)
      .subscribe({
       next: data => {
          this.currentCompetence = data;
          console.log(data);
        },
       error: error => {
          console.log(error);
        }});
  }
 
  updateCompetence(): void {
    this.message = '';
    
    this.competenceservice.update(this.currentCompetence.id, this.currentCompetence)
      .subscribe({
        next :response => {
           console.log(response.message); 
           this.reloadCurrentRoute()
          this.message = 'This user was updated successfully!';
        },
       error: error => {
          this.message = JSON.parse(error.error).message;
        }});
  }
  reloadPage():void{
    window.location.reload();
  }
  
          // Image Preview
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
  // Submit Form
  submit() {
    this.currentCompetence.image= this.imageURL
    //console.log(this.uploadForm.value)
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    /* show cropper */
    
}
cropperReady() {
    /* cropper ready */
}
loadImageFailed() {
    /* show message */
}
reloadCurrentRoute() {
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}

}
