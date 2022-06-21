import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { Service } from 'src/app/models/service.model';
import { User } from 'src/app/models/user.model';
import { MemberService } from 'src/app/_services/member.service';
import { ServiceService } from 'src/app/_services/service.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.scss']
})
export class ServiceCreateComponent implements OnInit {
  currentService: Service = {
    service: '',
    description:'',
    image:'' ,
    UserId:'',
    Members:[]
    
  };
  FormService!: FormGroup 
  isSuccessful = false;
  formFailed = false;
  errorMessage = '';
  imageURL?: string;
  uploadForm: FormGroup;
  users?:User[];
  members?:Member[]

  constructor(private memberservice : MemberService, private userservice: UserService,
    private _builder:FormBuilder, public fb: FormBuilder, private serviceService: ServiceService,
    private router: Router,
    private ngZone: NgZone,) {
          this.uploadForm = this.fb.group({
            avatar: [null],
            name: ['']
          });
         
   }
   
  ngOnInit(): void {
    this.FormService = new FormGroup({
    service: new FormControl(),   
    description:new FormControl(),
    image:new FormControl(),
    UserId: new FormControl(),
    Members: new FormControl(),
    
    })
    this.retrieveUser()
    this.retrieveMembers()
  }
 
  submitForm(){
    let newService: Service={
     service: this.FormService.value['service'],   
     description:this.FormService.value['description'],
     image: this.imageURL,
     UserId:this.FormService.value['UserId'],
     Members: this.FormService.value['Members']
    }
   
    this.serviceService.create(newService).subscribe({
      
        next: data => {
          console.log(data);
          if(this.isSuccessful = true){
            this.ngZone.run(() => this.router.navigateByUrl('/services'))
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
  retrieveMembers(): void {
    this.memberservice.getAllMembers().subscribe
      ({ next :
        data => {
          this.members = data;
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }
  get f(){
    return this.uploadForm.controls;
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

        this.currentService.image=this.imageURL;
        console.log(this.currentService);
      }
  reader.readAsDataURL(file)
}

}
