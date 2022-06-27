import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { ServiceDemande } from 'src/app/models/service-demande.model';
import { Service } from 'src/app/models/service.model';
import { User } from 'src/app/models/user.model';
import { MemberService } from 'src/app/_services/member.service';
import { ServiceService } from 'src/app/_services/service.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-home-service-create',
  templateUrl: './home-service-create.component.html',
  styleUrls: ['./home-service-create.component.scss']
})
export class HomeServiceCreateComponent implements OnInit {
  private roles: string[] = [];
 
  isLoggedIn = false;
  username?:string;
  image?:string;
  loginUser?:string;
  ServiceDemande?:ServiceDemande[];
  FormServiceDemande!:FormGroup;

  password?:string;
  useRole?='';
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
  members?:Member[];

  constructor(private memberservice : MemberService, private userservice: UserService,
    private _builder:FormBuilder, public fb: FormBuilder, private serviceService: ServiceService,
    private router: Router,
    private ngZone: NgZone, private tokenStorageService: TokenStorageService) {
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
    this.retrieveMembers();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      
      
       this.roles = user.roles;
       this.useRole= user.roles
      this.username = user.username;
      this.image=user.image;
     
    };
    
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
 
  submitForm(){
    let newService: Service={
     service: this.FormService.value['service'],   
     description:this.FormService.value['description'],
     image: this.imageURL,
     UserId:this.username,
     Members: this.FormService.value['Members']
    }
   
    this.serviceService.create(newService).subscribe({
      
        next: data => {
          console.log(data);
          if(this.isSuccessful = true){
            this.ngZone.run(() => this.router.navigateByUrl('/home'))
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
