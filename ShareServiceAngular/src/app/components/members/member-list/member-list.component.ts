import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Competence } from 'src/app/models/competence.model';
import { MemberCompetence } from 'src/app/models/member-competence.model';
import { Member } from 'src/app/models/member.model';
import { CompetenceService } from 'src/app/_services/competence.service';
import { MemberService } from 'src/app/_services/member.service';

// ask the trainer why i can not have an access to this modules
 //import { Select2OptionData } from '@angular/ng-select2'; 
// import { Options } from 'select2';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  p: number = 1;
  total: number = 0;
  // exampleData?: Array<Select2OptionData>;
  // options: Options;
  isSuccessful = false;
  formFailed = false;
  isShown: boolean = false ;
  isShownDetails:boolean=false;
  members?: any;
  memberCompetenceDetails?:MemberCompetence[];
  currentMember: Member = {};
  currentIndex = -1;
  member?:string;
  message='';
  competences?:Competence[];
  FormMember!: FormGroup;
  formMember: Member = {
    name: '',
    Competences:[]
  };
  FormMemberCompetence!:FormGroup;

  constructor(private memberservice : MemberService, private competenceservice : CompetenceService,
    private router: Router,
    private ngZone: NgZone,) { }

  
  ngOnInit(): void {
    this.FormMember = new FormGroup({
      name: new FormControl(),   
      Competences: new FormControl(),
 
      });

    this.FormMemberCompetence= new FormGroup({
      MemberId: new FormControl(),  
      CompetenceId: new FormControl(),  
      jour: new FormControl(),  
      heureDebut: new FormControl(),  
      heureFin: new FormControl(),
      niveauCompetence: new FormControl()    
    })
    this.retrieveMembers();
    this.retrieveCompetence();
    // this.options = {
    //   multiple: true,
    //   closeOnSelect: false,
    //   width: '300'
    // };
    
  }
 
  retrieveMembers(): void {
    this.memberservice.getAll(this.p).subscribe
      ({ next :
        (data:any) => {
          this.members =data;
          this.total = data.total;
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }
pageChangeEvent(event: number){
    this.p = event;
    this.retrieveMembers();
}
  retrieveCompetence(): void {
    this.competenceservice.getAll().subscribe
      ({ next :
        data => {
          this.competences = data;
          // this.exampleData=data;
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }
  refreshList(): void {
    this.retrieveMembers();
  }
  searchMember(): void {
    
    this.currentMember = {};
    this.currentIndex = -1;
    this.memberservice.findByName(this.member) 
      .subscribe({ next :
        data => {
         this.members  = data;
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }
  setActiveMember(member: Member, index: number): void {
    this.currentMember = member;
    this.currentIndex = index;
  }
  removeMember(i:any): void {
    if(window.confirm('Do you want to go ahead and delete? ')){
      this.memberservice.delete(this.currentMember.id)
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
  AddCompetence(){
    let newMember: Member={
      name: this.currentMember.name,
      Competences: this.FormMember.value['Competences']
     }
     this.memberservice.addCompetence(newMember).subscribe({
      
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
AddCompetenceDetails(){
  let newMemberDetails: MemberCompetence={
    MemberId: this.currentMember.id,
    CompetenceId: this.FormMemberCompetence.value['CompetenceId'],
    jour: this.FormMemberCompetence.value['jour'],
    heureDebut: this.FormMemberCompetence.value['heureDebut'],
    heureFin: this.FormMemberCompetence.value['heureFin '],
    niveauCompetence: this.FormMemberCompetence.value['niveauCompetence'],
  
   }
   this.memberservice.addCompetenceDetails(newMemberDetails).subscribe({
    
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
