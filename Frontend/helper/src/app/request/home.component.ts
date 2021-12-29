import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ServicehelperService } from '../servicehelper.service';
import jwt_decode from "jwt-decode";
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-request',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class RequestComponent implements OnInit {
  requestList:any
  jwtResutl:any;
  form_value!: FormGroup;
  sub!:Subscription;
  rid:string='';
  requestListObj:{
    id:string;
    fullname:string;
    title:string;
    types:string;
    description:string;
  }={
    id:'',
    fullname:'',
    title:'',
    types:'',
    description:'',
  }
  
toke:any;
decodeToke:any
 
  constructor(private requestService:ServicehelperService, private form_builder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    let result = localStorage.getItem('token') as string
    this.jwtResutl =jwtDecode(result) 
    console.log(this.jwtResutl)
    this.form_value = this.form_builder.group({
      'fullname':[''],
      'title':[''],
      'types':[''],
      'description':['']
    })
  }

  postRequest(){
    this.requestListObj = this.form_value.value;
    this.toke = localStorage.getItem("token");
    this.decodeToke = jwt_decode(this.toke)
    console.log(this.form_value.value)
    console.log(this.decodeToke)
    this.requestService.createPosts(this.requestListObj).subscribe(res=>{
      if(this.form_value.value.types=="helper"){
          this.router.navigate(['/','home','helper','helper'])
         this.form_value.reset()
        }
      if(this.form_value.value.types=="service"){
        this.router.navigate(['/','home','service','service'])
        this.form_value.reset()
      }
    })
  }

  
}
