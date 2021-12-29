import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProviderComponent } from './request/provider/provider.component';
import { RequestComponent } from './request/home.component';
import { AttachtokenInterceptor } from './attachtoken.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { ChecktokenGuard } from './guards/checktoken.guard';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    ProviderComponent,
    RequestComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      {path:'',redirectTo:'/login',pathMatch:'full'},
      {path:'login',component:LoginComponent},
      {path:'signup',component:SignupComponent},
      {path:'profile',component:ProfileComponent},
      {path:'home',loadChildren:()=>import('./request/home.module').then(m=>m.RequestModule),canActivate:[ChecktokenGuard]}
    ])
  ],
  providers: [ChecktokenGuard,{provide:HTTP_INTERCEPTORS, useClass: AttachtokenInterceptor, multi:true}],
  // providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
