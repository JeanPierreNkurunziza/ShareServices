import { Component,  OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  p: number = 1;
  total: number = 0;
  users?: any;
  currentUser: User = {};
  currentIndex = -1;
  username?:string;

  //iterableList = Object.keys(this.users);
  constructor(private userservice : UserService) { }

  ngOnInit(): void {
    this.retrieveUsers()
    
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
  removeUser(): void {
  
    // this.userservice.delete(this.currentUser.id)
    //   .subscribe({ next: response => {
    //     console.log(response);
        
    //     this.refreshList();
    //   },
    //   error: error => {
       
    //     console.log(error);
      
    //   }}
    //     );
  }
  searchEmail(): void {
    
    this.currentUser = {};
    this.currentIndex = -1;
  
    this.userservice.getAll()
      .subscribe({ next :
        data => {
          for( let item of data){
            if(this.username===item.username){
              this.users= data;
            }
            else{
              console.log("user not found")
            }
          }
         this.users  = data;
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }

}
