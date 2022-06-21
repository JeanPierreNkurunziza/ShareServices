import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'ShareServicePlateforme';
  private roles: string[] = [];
  isLoggedIn = false;
  //  showAddUsers = false;
  //  showAddFournitures= false;
   //usersAll = false;
  username?:string;
  loginUser?:string;
  password?:string;
  loginPassword?:string;
  image?:any;
  constructor(private tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      
       this.roles = user.roles;
       this.image= user.image
      // this.showAddUsers=true;
      // if(user.isAdmin){
      //   this.showAddFournitures=true;
      // }
     
     //this.showAddUsers = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
      // this.loginUser= user.email;
      // this.loginPassword= user.password
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  
 

}
