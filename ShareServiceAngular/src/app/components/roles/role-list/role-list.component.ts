import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/_services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  roles?: Role[];
  currentRole: Role = {};
  currentIndex = -1;
  role?:string;
  message=''
  constructor(private roleservice : RoleService,
    private router: Router,
    private ngZone: NgZone,) { }

  ngOnInit(): void {

    this.retrieveRole();
  }
  retrieveRole(): void {
    this.roleservice.getAll().subscribe
      ({ next :
        data => {
          this.roles = data;
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }
  refreshList(): void {
    this.retrieveRole();
  }
  searchRole(): void {
    
    this.currentRole = {};
    this.currentIndex = -1;
    this.roleservice.getRole(this.role)
      .subscribe({ next :
        data => {
         this.roles  = data;
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }
  setActiveRole(role: Role, index: number): void {
    this.currentRole = role;
    this.currentIndex = index;
  }
  removeRole(i:any): void {
    if(window.confirm('Do you want to go ahead and delete? ')){
      this.roleservice.delete(this.currentRole.id)
      .subscribe({
         
       next :response => {
          console.log(response.message);
          
         this.message = 'This role was deleted successfully!';     
       },
      error: error => {
         
         this.message = JSON.parse(error.error).message;
        
       }});
       
    }
     
  }

}
