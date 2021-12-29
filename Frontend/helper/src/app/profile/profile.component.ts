import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServicehelperService } from '../servicehelper.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  requestList:any
  sub!:Subscription;
  types:any;
  jwtResutl:any;
  uid: string = '';
  public profileForm !: FormGroup;

  profileListObj:{
    id :string;
    fullname :string;
    city:string;
    zipcode:string;
    state:string;
    phone:string;
    address:string;
}={
  id:'',
  fullname:'',
  city:'',
  zipcode:'',
  state:'',
  phone:'',
  address:'',
}
  constructor(private requestService:ServicehelperService,private formBuilder: FormBuilder, private http: HttpClient,private routers: Router, private router: ActivatedRoute) { }

  ngOnInit(): void {

    this.profileForm = this.formBuilder.group({
      fullname:[''],
      city:[''],
      zipcode:[''],
      state:[''],
      phone:[''],
      address:['']
    })

    let result = localStorage.getItem('token') as string
    this.jwtResutl =jwtDecode(result) 
   
    this.sub = this.requestService.getUserById(this.jwtResutl._id).subscribe((i:any)=> {
      // console.log(i)
      // console.log(i.data.fullname)
      this.types = i.data
    });
  }


onEdit(user:any){
  this.profileListObj.id = user._id 
  this.profileForm.controls['fullname'].setValue(user.fullname)
  this.profileForm.controls['city'].setValue(user.city)
  this.profileForm.controls['state'].setValue(user.state)
  this.profileForm.controls['phone'].setValue(user.phone)
  this.profileForm.controls['zipcode'].setValue(user.zipcode)
  console.log(user)
}

UpdateProfile(){
  this.requestService.updateUser(this.jwtResutl._id,this.profileForm.value).subscribe(res=>{
    alert("update successfully")
    this.routers.navigate(['login'])
  })
}
  }