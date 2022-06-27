import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceDemande } from 'src/app/models/service-demande.model';
import { User } from 'src/app/models/user.model';
import { ServiceService } from 'src/app/_services/service.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-home-user-side',
  templateUrl: './home-user-side.component.html',
  styleUrls: ['./home-user-side.component.scss']
})
export class HomeUserSideComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  isShownDetails:boolean=false;
  username?:string;
  image?:string;
  loginUser?:string;
  email?:string 
  ServiceDemande?:ServiceDemande[];
  FormServiceDemande!:FormGroup;
  isSuccessful = false;
  formFailed = false;
  errorMessage = '';

  password?:string;
  useRole?='';

  p: number = 1;
  total: number = 0;
  users?: any;
  currentUser: User = {};
  currentIndex = -1;
  //username?:string;

  //iterableList = Object.keys(this.users);
  constructor(private userservice : UserService, private tokenStorageService: TokenStorageService,
    private _builder:FormBuilder, public fb: FormBuilder, private serviceService: ServiceService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.retrieveUsers()
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      
      
       this.roles = user.roles;
       this.useRole= user.roles
      this.username = user.username;
      this.image=user.image;
      this.email= user.email
    };
    this.FormServiceDemande= new FormGroup({
      id:new FormControl(),
      MemberId: new FormControl(),  
      ServiceId: new FormControl(),  
      jourHeurePropose: new FormControl(),  
        
    })
    
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
 
  pageChangeEvent(event: number){
    this.p = event;
    this.retrieveUsers();
   }
  retrieveUsers(): void {
    this.userservice.getAllWithPages(this.p).subscribe
    ({ next :
      (data:any) => {
        this.users =data;
        this.total = data.total;
        console.log(data);
      },
      error : error => {
        console.log(error);
      }});
  }
  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }
  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }
  AddServiceDetails(){
    let newServiceDetails: ServiceDemande={
      id:this.FormServiceDemande.value['id'],
      ServiceId: this.FormServiceDemande.value['ServiceId'],
      MemberId: this.FormServiceDemande.value['MemberId'],
      jourHeurePropose: this.FormServiceDemande.value['jourHeurePropose'],
      
     }
     this.serviceService.addServiceDemandeDetails(newServiceDetails).subscribe({
      
      next: data => {
        console.log(data);
        if(this.isSuccessful = true){
          //this.ngZone.run(() => this.router.navigateByUrl('/members'))
          this.reloadCurrentRoute()
        }
        this.formFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.formFailed = true;
      }
  })
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  toggleShowDetails() {
  
    this.isShownDetails = ! this.isShownDetails;
    }
  
 

}