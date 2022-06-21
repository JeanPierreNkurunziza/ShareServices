import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/_services/role.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit {

  currentRole: Role = {
    role: ''
  };
  FormRole!: FormGroup 
  isSuccessful = false;
  formFailed = false;
  errorMessage = '';

  constructor(private roleservice : RoleService,
    private _builder:FormBuilder, public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,) { }
   
  ngOnInit(): void {
    this.FormRole = new FormGroup({
      role: new FormControl()
        
    })
  }
  submitForm(){
    let newRole: Role={
      role: this.FormRole.value['role'],
    
    }
    this.roleservice.create(newRole).subscribe({
      
        next: data => {
          console.log(data);
          if(this.isSuccessful = true){
            this.ngZone.run(() => this.router.navigateByUrl('/roles'))
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

}


