import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  //  showAddUsers = false;
  //  showAddFournitures= false;
   //usersAll = false;
  username?:string;
  image?:string;
  loginUser?:string;
  password?:string;
  useRole?='';
  constructor(private tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      
      
       this.roles = user.roles;
       this.useRole= user.roles
      // this.showAddUsers=true;
      // if(user.isAdmin){
      //   this.showAddFournitures=true;
      // }
     
     //this.showAddUsers = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
      this.image=user.image;
      // this.loginUser= user.email;
      // this.loginPassword= user.password
    }
    else{
      this.useRole="ROLE_VISITOR";
      this.username="Visitor"
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
