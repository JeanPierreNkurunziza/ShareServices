import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { AuthService } from 'src/app/_services/auth.service';
import { RoleService } from 'src/app/_services/role.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    Roles:[],
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles?:Role[]
  constructor(private authService: AuthService, private route: ActivatedRoute,
    private router: Router,private roleservice : RoleService) { }
  ngOnInit(): void {
    this.retrieveRole()
  }
  onSubmit(): void {
    const { username, email, password, Roles } = this.form;
    this.authService.register(username, email, password, Roles).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        // this.reloadCurrentRoute()
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  retrieveRole(): void {
    this.roleservice.getAll().subscribe
      ({ next :
        data => {
          this.roles = data.filter(p=> p.role !="admin");
          console.log(data);
        },
        error : error => {
          console.log(error);
        }});
  }
 
}
