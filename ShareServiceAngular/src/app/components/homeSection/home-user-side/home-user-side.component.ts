import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-home-user-side',
  templateUrl: './home-user-side.component.html',
  styleUrls: ['./home-user-side.component.scss']
})
export class HomeUserSideComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  username?:string;
  image?:string;
  loginUser?:string;
  email?:string 

  password?:string;
  useRole?='';

  p: number = 1;
  total: number = 0;
  users?: any;
  currentUser: User = {};
  currentIndex = -1;
  //username?:string;

  //iterableList = Object.keys(this.users);
  constructor(private userservice : UserService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.retrieveUsers()
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
    this.retrieveUsers();
   }
  retrieveUsers(): void {
    this.userservice.getAllWithPages(this.p).subscribe
    ({ next :
      (data:any) => {
        this.users =data;
        this.total = data.total;
        console.log(data);
      },
      error : error => {
        console.log(error);
      }});
  }
  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }
  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }
 

}