import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// import {ButtonModule} from 'primeng/button';
//  import {InputTextModule} from 'primeng/inputtext';
// import { ScrollingModule } from '@angular/cdk/scrolling';
//import {TableModule} from 'primeng/table';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CompetenceListComponent } from './components/competences/competence-list/competence-list.component';
import { CompetenceCreateComponent } from './components/competences/competence-create/competence-create.component';
import { CompetenceDetailsComponent } from './components/competences/competence-details/competence-details.component';
import { ImagePipe } from './_pipes/image.pipe';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MemberCreateComponent } from './components/members/member-create/member-create.component';
import { MemberDetailsComponent } from './components/members/member-details/member-details.component';
import { QuartierDetailsComponent } from './components/quartiers/quartier-details/quartier-details.component';
import { QuartierListComponent } from './components/quartiers/quartier-list/quartier-list.component';
import { QuartierCreateComponent } from './components/quartiers/quartier-create/quartier-create.component';
import { RoleCreateComponent } from './components/roles/role-create/role-create.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';
import { RoleDetailsComponent } from './components/roles/role-details/role-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ServiceDetailsComponent } from './components/services/service-details/service-details.component';
import { ServiceListComponent } from './components/services/service-list/service-list.component';
import { ServiceCreateComponent } from './components/services/service-create/service-create.component';
import { HomesectionComponent } from './components/homeSection/homesection/homesection.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { Select2Module } from 'ng2-select2';
//import { Select2Module } from 'ng2-select2';
// import { Select2Component, Select2Module } from 'ng2-select2';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    UserListComponent,
    UserDetailsComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CompetenceListComponent,
    CompetenceCreateComponent,
    CompetenceDetailsComponent,
    ImagePipe,
    MemberListComponent,
    MemberCreateComponent,
    MemberDetailsComponent,
    QuartierDetailsComponent,
    QuartierListComponent,
    QuartierCreateComponent,
    RoleCreateComponent,
    RoleListComponent,
    RoleDetailsComponent,
    ServiceDetailsComponent,
    ServiceListComponent,
    ServiceCreateComponent,
    HomesectionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    // Select2Component,
    //Select2Module,
    NgxPaginationModule,
    NgbModule
       
  ],
  providers: [ authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
