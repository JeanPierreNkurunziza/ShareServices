import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Competence } from 'src/app/models/competence.model';
import { CompetenceService } from 'src/app/_services/competence.service';
import { NgbCarouselConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-homesection',
  templateUrl: './homesection.component.html',
  styleUrls: ['./homesection.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomesectionComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  username?:string;
  image?:string;
  loginUser?:string;
  email?:string 
  password?:string;
  useRole?='';
  isBleu:boolean=false;
  closeModal:any;
  p: number = 1;
  total: number = 0;
  competences?: any;
  // list!:Competence[];
  currentCompetence: Competence = {};
  currentIndex = -1;
  competence?:string;
  message='';
  nombreMember=0;
  constructor(private competenceservice : CompetenceService,
    private router: Router,
    private ngZone: NgZone,config: NgbCarouselConfig, private modalService: NgbModal,
    private tokenStorageService: TokenStorageService) { 
    config.interval = 3000;
    config.keyboard = true;
    config.pauseOnHover = true;
    }

  ngOnInit(): void {

    this.retrieveCompetences();
    setInterval(()=>{
      this.isBleu=!this.isBleu;
    }, 1000);
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      
      
       this.roles = user.roles;
       this.useRole= user.roles
      this.username = user.username;
      this.image=user.image;
      this.email= user.email
     
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  pageChangeEvent(event: number){
    this.p = event;
    this.retrieveCompetences();
   }
   triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  retrieveCompetences(): void {
    this.competenceservice.getAllCompetences(this.p).subscribe
    ({ next :
      (data:any) => {
        
        this.competences =data;
        this.total = data.total;
      // this.list=data;
        console.log(data);
      },
      error : error => {
        console.log(error);
      }});
  }
  refreshList(): void {
    this.retrieveCompetences();
  }
  searchCompetence(): void {
    
    this.currentCompetence = {};
    this.currentIndex = -1;
    this.competenceservice.findByName(this.competence)
      .subscribe({ next :
        data => {
         this.competences  = data;
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }
  setActiveCompetence(competence: Competence, index: number): void {
    this.currentCompetence = competence;
    this.currentIndex = index;
  }
  removeCompetence(i:any): void {
    if(window.confirm('Do you want to go ahead and delete? ')){
      this.competenceservice.delete(this.currentCompetence.id)
      .subscribe({
         
       next :response => {
          console.log(response.message);
          
         this.message = 'This user was deleted successfully!';     
       },
      error: error => {
         
         this.message = JSON.parse(error.error).message;
        
       }});
       
    }
     
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  myFunction() {
    alert("Please Sign up first!");
  }

}

