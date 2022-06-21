import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MemberService } from 'src/app/_services/member.service';
import { Member } from 'src/app/models/member.model';
import { Quartier } from 'src/app/models/quartier.model';
import { QuartierService } from 'src/app/_services/quartier.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
  imageURL?: string;
  uploadForm: FormGroup;
  quartierForm:FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isSuccessful = false;
  formFailed = false;

  quartiers!: Quartier[]
  currentMember: Member = {
    name: '',
    surname:'',
    email:'',
    phone:'',
    rue:'',
    numero:'',
    image:'',
    QuartierId:''
   
  };
 
  message = '';
  constructor(private memberservice: MemberService, private quartierservice: QuartierService,
    private route: ActivatedRoute,
    private router: Router, private httpClient: HttpClient, public fb: FormBuilder,
    private ngZone: NgZone,) { 
      this.uploadForm = this.fb.group({
        avatar: [null],
        name: ['']
      }); 
      this.quartierForm = this.fb.group({
        QuartierId: [null]
      });
    }
    form = new FormGroup({
      QuartierId: new FormControl('', Validators.required)
    });
  ngOnInit(): void {
    this.message = '';
    this.getMember(this.route.snapshot.params['id']);
    this.retrieveQuartier();
   
  }
  // submitQuartier() {
   
  //     this.quartierForm.updateValueAndValidity()
  //    this.currentMember.QuartierId= this.quartierForm.value
  
  // }
  retrieveQuartier(): void {
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
  get f(){
    return this.uploadForm.controls;
  }
  getMember(id: string): void {
    this.memberservice.get(id)
      .subscribe({
       next: data => {
          this.currentMember = data;
          console.log(data);
        },
       error: error => {
          console.log(error);
        }});
  }
  getQuartierId(quartier:any):void{
    this.quartierservice.getQuartierId(quartier).subscribe({
      next: data =>{
        console.log(data)
        return data;
      },
      error: error => {
         console.log(error);
       }});
    
  }
  updateMember(): void {
    this.message = '';
   
    this.memberservice.update(this.currentMember.id, this.currentMember)
    
      .subscribe({ 
        next :response => {
           console.log(response);
           if(this.isSuccessful = true){
            this.ngZone.run(() => this.router.navigateByUrl('/members'))
            this.message = 'This user was updated successfully!';         
            } 
          this.formFailed = false;
        },
        
       error: err => {          
          this.message = err.error.message;
          this.formFailed = true;
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

          this.currentMember.image=this.imageURL;
          console.log(this.currentMember);
        }
    reader.readAsDataURL(file)
  }
//   // Submit Form
  submit() {
    this.currentMember.image= this.imageURL
    //console.log(this.uploadForm.value)
  }
//   fileChangeEvent(event: any): void {
//     this.imageChangedEvent = event;
//   }
//   imageCropped(event: ImageCroppedEvent) {
//     this.croppedImage = event.base64;
//   }
//   imageLoaded() {
//     /* show cropper */
    
// }
// cropperReady() {
//     /* cropper ready */
// }
// loadImageFailed() {
//     /* show message */
// }
}