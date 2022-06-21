import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/_services/user.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  imageURL?: string;
  uploadForm: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  loading=false
  
  currentUser: User = {
    username: '',
    email: '',
    password: '',
    Roles:[],
    image:'',
  };
 
  message = '';

  constructor(private userservice: UserService,
    private route: ActivatedRoute,
    private router: Router, private httpClient: HttpClient, public fb: FormBuilder) { 
      this.uploadForm = this.fb.group({
        avatar: [null],
        name: ['']
      })
    }

  ngOnInit(): void {
    this.message = '';
    this.getUser(this.route.snapshot.params['id']);
  }
  getUser(id: string): void {
    this.userservice.get(id)
      .subscribe({
       next: data => {
          this.currentUser = data;
          console.log(data);
        },
       error: error => {
          console.log(error);
        }});
  }
  updateUser(): void {
    this.message = '';
    
    this.userservice.update(this.currentUser.id, this.currentUser)
    
      .subscribe({
        
        next :response => {
         // return res.status(200).send({ message: "User upadated successful." });
           console.log(response.message);
          // this.message=JSON.parse(response.message)
            
          this.message = 'This user was updated successfully!';
         
        },
       error: error => {
        this.message = 'Try to reflesh your password!';
          this.message = JSON.parse(error.error).message;
          this.loading = false;
          //this.reloadPage();
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

          this.currentUser.image=this.imageURL;
          console.log(this.currentUser);
        }
    reader.readAsDataURL(file)
  }
  // Submit Form
  submit() {
    this.currentUser.image= this.imageURL
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

}
