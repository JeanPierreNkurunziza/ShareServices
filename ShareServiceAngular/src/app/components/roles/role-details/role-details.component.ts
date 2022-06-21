import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/_services/role.service';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {


  isSuccessful = false;
  formFailed = false;
  currentRole: Role = {
    role: '',
  };
  message = '';
  constructor(private roleservice: RoleService,
    private route: ActivatedRoute,
    private router: Router, private httpClient: HttpClient, public fb: FormBuilder,
    private ngZone: NgZone,) { 
     
    }
  ngOnInit(): void {
    this.message = '';
    this.getRole(this.route.snapshot.params['id']);
  }
  getRole(id: string): void {
    this.roleservice.get(id)
      .subscribe({
       next: data => {
          this.currentRole = data;
          console.log(data);
        },
       error: error => {
          console.log(error);
        }});
  }
 
  updateRole(): void {
    this.message = '';
    
    this.roleservice.update(this.currentRole.id, this.currentRole)
      .subscribe({
        next :response => {
           console.log(response.message); 
           if(this.isSuccessful = true){
            this.ngZone.run(() => this.router.navigateByUrl('/roles'))
            this.message = 'This role was updated successfully!';         
            } 
          this.formFailed = false
         
        },
       error: error => {
          this.message = error.error.message;
          // this.message = JSON.parse(error.error).message;
          this.formFailed = true;
        }});
  }
  reloadPage():void{
    window.location.reload();
  }
  
}

