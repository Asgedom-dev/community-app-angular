import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProviderComponent } from './provider/provider.component';
import { RequestComponent } from './home.component';
import { HelperComponent } from './helper/helper.component';
import { PaginationcontrolComponent } from './paginationcontrol/paginationcontrol.component';
import { ChecktokenGuard } from '../guards/checktoken.guard';



@NgModule({
  declarations: [
    HelperComponent,
    PaginationcontrolComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'',component:RequestComponent,children:[
        {path:'service/:types',component:ProviderComponent},
        {path:'helper/:types',component:HelperComponent},
        {path:'**',redirectTo:''}
      ]}
      
      ])
  ],
  providers:[],
  bootstrap:[RequestComponent]
})
export class RequestModule { }