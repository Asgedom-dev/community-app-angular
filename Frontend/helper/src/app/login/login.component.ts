import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServicehelperService } from '../servicehelper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private helperServive:ServicehelperService,private router:Router) { }
  sub!:Subscription
  u_id: string = '';
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  login(){
    this.helperServive.login(this.loginForm.value).subscribe((res:any)=>{
      localStorage.setItem('token',res.result)
      console.log(res.result)
      if(res.result=='err'){
        alert('check your email or password')
this.router.navigate(['/','login']);
      }
      else{
        this.router.navigate(['/','home','helper','helper']); 
      }
    })
 };

}
