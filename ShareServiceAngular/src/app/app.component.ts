import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { OneSignal } from 'onesignal-ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
  image?:string;
  constructor(private tokenStorageService: TokenStorageService, private oneSignal: OneSignal) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      
       this.roles = user.roles;
      // this.showAddUsers=true;
      // if(user.isAdmin){
      //   this.showAddFournitures=true;
      // }
     
     //this.showAddUsers = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
      this.image=user.image
      // this.loginUser= user.email;
      // this.loginPassword= user.password
    }
    this.oneSignal.init({
      appId: "eea662ba-d1f5-4fff-9827-f26a7b9b4765",
  });
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
