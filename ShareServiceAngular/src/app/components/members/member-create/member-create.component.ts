import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { MemberService } from 'src/app/_services/member.service';
import { QuartierService } from 'src/app/_services/quartier.service';
import { Quartier } from 'src/app/models/quartier.model';
import { Competence } from 'src/app/models/competence.model';
import { CompetenceService } from 'src/app/_services/competence.service';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.scss']
})
export class MemberCreateComponent implements OnInit {
  currentMember: Member = {
    name: '',
    surname:'',
    email:'',
    phone:'',
    rue:'',
    numero:'',
    image:'' ,
    QuartierId:'',
    Competences:[]
    
  };
  FormMember!: FormGroup 
  isSuccessful = false;
  formFailed = false;
  errorMessage = '';
  imageURL?: string;
  uploadForm: FormGroup;
  quartiers?:Quartier[];
  competences?:Competence[]

  constructor(private memberservice : MemberService, private quartierservice: QuartierService,
    private _builder:FormBuilder, public fb: FormBuilder, private competenceservice: CompetenceService,
    private router: Router,
    private ngZone: NgZone,) {
          this.uploadForm = this.fb.group({
            avatar: [null],
            name: ['']
          });
         
   }
   
  ngOnInit(): void {
    this.FormMember = new FormGroup({
    name: new FormControl(),   
    surname:new FormControl(),
    email:new FormControl(),
    phone:new FormControl(),
    rue:new FormControl(),
    numero:new FormControl(),
    image:new FormControl(),
    QuartierId: new FormControl(),
    Competences: new FormControl(),
    // this.FormCompetence= this._builder.group({
    //   competence: ['', Validators.required],
    //   image:[null, Validators]
    // })
    })
    this.retrieveQuartier()
    this.retrieveCompetence()
  }
 
  submitForm(){
    let newMember: Member={
     name: this.FormMember.value['name'],   
     surname:this.FormMember.value['surname'],
     email:this.FormMember.value['email'],
     phone:this.FormMember.value['phone'],
     rue:this.FormMember.value['rue'],
     numero:this.FormMember.value['numero'],
     image: this.imageURL,
     QuartierId:this.FormMember.value['QuartierId'],
     Competences: this.FormMember.value['Competences']
    }
    // this.currentCompetence.competence= this.FormCompetence.value['competence']
    // this.currentCompetence.image=this.FormCompetence.value['image']
   
    this.memberservice.create(newMember).subscribe({
      
        next: data => {
          console.log(data);
          if(this.isSuccessful = true){
            this.ngZone.run(() => this.router.navigateByUrl('/members'))
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
  retrieveCompetence(): void {
    this.competenceservice.getAll().subscribe
      ({ next :
        data => {
          this.competences = data;
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

        this.currentMember.image=this.imageURL;
        console.log(this.currentMember);
      }
  reader.readAsDataURL(file)
}

}
