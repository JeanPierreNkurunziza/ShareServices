import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetenceCreateComponent } from './components/competences/competence-create/competence-create.component';
import { CompetenceDetailsComponent } from './components/competences/competence-details/competence-details.component';
import { CompetenceListComponent } from './components/competences/competence-list/competence-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MemberCreateComponent } from './components/members/member-create/member-create.component';
import { MemberDetailsComponent } from './components/members/member-details/member-details.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QuartierCreateComponent } from './components/quartiers/quartier-create/quartier-create.component';
import { QuartierDetailsComponent } from './components/quartiers/quartier-details/quartier-details.component';
import { QuartierListComponent } from './components/quartiers/quartier-list/quartier-list.component';
import { RegisterComponent } from './components/register/register.component';
import { RoleCreateComponent } from './components/roles/role-create/role-create.component';
import { RoleDetailsComponent } from './components/roles/role-details/role-details.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';
import { ServiceCreateComponent } from './components/services/service-create/service-create.component';
import { ServiceDetailsComponent } from './components/services/service-details/service-details.component';
import { ServiceListComponent } from './components/services/service-list/service-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  {path : 'register', component: RegisterComponent},
  {path : 'login', component: LoginComponent},
  {path : 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'users/:id', component: UserDetailsComponent },
  {path: 'competences', component: CompetenceListComponent },
  {path: 'competences/:id', component: CompetenceDetailsComponent},
  {path: 'AddCompetence', component: CompetenceCreateComponent},
  {path: 'members', component: MemberListComponent},
  {path: 'members/:id', component:MemberDetailsComponent},
  {path:'AddMember', component: MemberCreateComponent},
  {path: 'quartiers', component: QuartierListComponent},
  {path: 'quartiers/:id', component:QuartierDetailsComponent},
  {path:'AddQuartier', component: QuartierCreateComponent},
  {path: 'roles', component: RoleListComponent},
  {path: 'roles/:id', component:RoleDetailsComponent},
  {path:'AddRole', component: RoleCreateComponent}, 
  {path: 'services', component: ServiceListComponent},
  {path: 'services/:id', component: ServiceDetailsComponent},
  {path:'AddService', component: ServiceCreateComponent} 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
