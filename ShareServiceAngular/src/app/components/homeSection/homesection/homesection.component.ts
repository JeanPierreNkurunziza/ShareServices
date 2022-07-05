import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Competence } from 'src/app/models/competence.model';
import { CompetenceService } from 'src/app/_services/competence.service';
import { NgbCarouselConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import * as Highcharts from 'highcharts';





@Component({
  selector: 'app-homesection',
  templateUrl: './homesection.component.html',
  styleUrls: ['./homesection.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomesectionComponent implements OnInit {
  highcharts = Highcharts;
  private roles: string[] = [];
  searchTerm!: string ;
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
  currentCompetence: Competence = {};
  currentIndex = -1;
  competence?:string;
  message='';
  allCompetences!:any[] 
  collectionSize?: number;
  dataCompetence!:Competence[];
  nombreMember?=0;
  dataCharts: any = [];
  updatedChart:boolean =false

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
    };
    
  }

  search( value: string ): void {
    
    this.competences = this.allCompetences.filter((val) => val.competence.toLowerCase().includes(value));
    this.collectionSize = this.competences.length;
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
        this.collectionSize= data.length;
        this.allCompetences=this.competences;
        this.dataCompetence=this.competences;
        for(let i of this.dataCompetence){
          if(i.id){
           //collect data for filling the charts
            this.dataCharts.push({name:i.competence, y:i.MemberCompetences?.length})
            
          }
        }
          this.chartOptions.series=[
            {name: 'Brands',
            colorByPoint: true,
            type: 'pie',
            data: this.dataCharts}]
            // console.log(this.chartOptions)
            this.updatedChart=true;
        // console.log(data);
      },
      error : error => {
        console.log(error);
      }});
  }
  refreshList(): void {
    this.retrieveCompetences();
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
  // **************************************** charts tests*********************
  chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: 'silver',
      plotBorderWidth: 2,
      plotShadow: true,
      type: 'pie'
    },
    title: {
      text: 'Members registered per competence'
    },
    tooltip: {

      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
       type: 'pie',
       data: [this.dataCharts]
    
    }]
  }

}

