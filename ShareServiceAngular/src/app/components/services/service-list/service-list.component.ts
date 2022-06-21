import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { ServiceDemande } from 'src/app/models/service-demande.model';
import { Service } from 'src/app/models/service.model';
import { MemberService } from 'src/app/_services/member.service';
import { ServiceService } from 'src/app/_services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  p: number = 1;
  total: number = 0;
  // exampleData?: Array<Select2OptionData>;
  // options: Options;
  isSuccessful = false;
  formFailed = false;
  isShown: boolean = false ;
  isShownDetails:boolean=false;
  services?: any;
  ServiceDemande?:ServiceDemande[];
  currentService: Service = {};
  currentIndex = -1;
  service?:string;
  message='';
  members?:Member[];
  FormService!: FormGroup;
  formService: Service = {
    service: '',
    Members:[]
  };
  FormServiceDemande!:FormGroup;

  constructor(private serviceService : ServiceService, private memberservice : MemberService,
    private router: Router,
    private ngZone: NgZone,) { }

  
  ngOnInit(): void {
    this.FormService = new FormGroup({
      service: new FormControl(),   
      Members: new FormControl(),
 
      });

    this.FormServiceDemande= new FormGroup({
      id:new FormControl(),
      MemberId: new FormControl(),  
      ServiceId: new FormControl(),  
      jourHeurePropose: new FormControl(),  
        
    })
    this.retrieveServices();
    this.retrieveMembers();
    // this.options = {
    //   multiple: true,
    //   closeOnSelect: false,
    //   width: '300'
    // };
    
  }
 
  retrieveServices(): void {
    this.serviceService.getAllWithPaging(this.p).subscribe
      ({ next :
        (data:any) => {
          this.services =data;
          this.total = data.total;
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }
pageChangeEvent(event: number){
    this.p = event;
    this.retrieveServices();
}
  retrieveMembers(): void {
    this.memberservice.getAllMembers().subscribe
      ({ next :
        data => {
          this.members = data;
          // this.exampleData=data;
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }
  refreshList(): void {
    this.retrieveServices();
  }
  searchService(): void {
    
    this.currentService = {};
    this.currentIndex = -1;
    this.serviceService.findByName(this.service) 
      .subscribe({ next :
        data => {
         this.services  = data;
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }
  setActiveService(service: Service, index: number): void {
    this.currentService = service;
    this.currentIndex = index;
  }
  removeService(i:any): void {
    if(window.confirm('Do you want to go ahead and delete? ')){
      this.serviceService.delete(this.currentService.id)
      .subscribe({
         
       next :response => {
          console.log(response.message);
          
         this.message = 'This member was deleted successfully!';     
       },
      error: error => {
         
         this.message = JSON.parse(error.error).message;
        
       }});
       
    }
     
  }
  toggleShow() {
  this.isShown = ! this.isShown;
  } 
  toggleShowDetails() {

    this.isShownDetails = ! this.isShownDetails;
    }
  AddMember(){
    let newMember: Service={
      id: this.currentService.id,
      Members: this.FormService.value['Members']
     }
     this.serviceService.addMember(newMember).subscribe({
      
      next: data => {
        console.log(data);
        if(this.isSuccessful = true){
          // this.ngZone.run(() => this.router.navigateByUrl('/members'))
         // this.reloadCurrentRoute();
         this.reloadComponent();
        }
        this.formFailed = false;
      },
      error: err => {
        this.message = err.error.message;
        this.formFailed = true;
      }
  })
}
AddServiceDetails(){
  let newServiceDetails: ServiceDemande={
    id:this.FormServiceDemande.value['id'],
    ServiceId: this.currentService.id,
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
      this.message = err.error.message;
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
reloadComponent() {
  let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

}
