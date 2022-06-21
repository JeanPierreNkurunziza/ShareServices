import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { User } from 'src/app/models/user.model';
import { ServiceService } from 'src/app/_services/service.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {

  imageURL?: string;
  uploadForm: FormGroup;
  userForm:FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isSuccessful = false;
  formFailed = false;

  users!: User[]
  currentService: Service = {
    service: '',
    description:'',
    image:'',
    UserId:''
   
  };
 
  message = '';
  constructor(private serviceService: ServiceService, private userservice: UserService,
    private route: ActivatedRoute,
    private router: Router, private httpClient: HttpClient, public fb: FormBuilder,
    private ngZone: NgZone,) { 
      this.uploadForm = this.fb.group({
        avatar: [null],
        name: ['']
      }); 
      this.userForm = this.fb.group({
        UserId: [null]
      });
    }
    form = new FormGroup({
      UserId: new FormControl('', Validators.required)
    });
  ngOnInit(): void {
    this.message = '';
    this.getService(this.route.snapshot.params['id']);
    this.retrieveUser();
   
  }
  // submitQuartier() {
   
  //     this.quartierForm.updateValueAndValidity()
  //    this.currentMember.QuartierId= this.quartierForm.value
  
  // }
  retrieveUser(): void {
    this.userservice.getAll().subscribe
      ({ next :
        data => {
          this.users = data;
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }
  get f(){
    return this.uploadForm.controls;
  }
  getService(id: string): void {
    this.serviceService.get(id)
      .subscribe({
       next: data => {
          this.currentService = data;
          console.log(data);
        },
       error: error => {
          console.log(error);
        }});
  }
  getUser(quartier:any):void{
    this.userservice.findByName(quartier).subscribe({
      next: data =>{
        console.log(data)
        return data;
      },
      error: error => {
         console.log(error);
       }});
    
  }
  updateService(): void {
    this.message = '';
   
    this.serviceService.update(this.currentService.id, this.currentService)
    
      .subscribe({ 
        next :response => {
           console.log(response);
           if(this.isSuccessful = true){
            this.ngZone.run(() => this.router.navigateByUrl('/services'))
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

          this.currentService.image=this.imageURL;
          console.log(this.currentService);
        }
    reader.readAsDataURL(file)
  }
//   // Submit Form
  submit() {
    this.currentService.image= this.imageURL
    //console.log(this.uploadForm.value)
  }

}
