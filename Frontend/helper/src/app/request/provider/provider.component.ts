import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServicehelperService } from 'src/app/servicehelper.service';


@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  requestList:any
  subs!:Subscription;
  pid:string='';
  paramreturn:string=''
  typesResult:any[]=[]
  // data: any;
  types:any;
  collection: any;
  commentListObj_:{
    id :string;
    comment :string
}={
  id:'',
  comment:''
}
  public commentForm_ !: FormGroup;
  constructor(private formBuilder_: FormBuilder,private requestService:ServicehelperService,private x: Router,private router: ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    this.commentForm_ = this.formBuilder_.group({
      comments:[''],
    })

    this.subs = this.router.paramMap.subscribe((params) => {
      // console.log(params.get('ptypes'))
      this.paramreturn = params.get('types') as string 
      console.log(this.paramreturn)
      this.subs= this.requestService.getByTypes(this.paramreturn).subscribe((u: any) => {
        this.typesResult=u.getService
             console.log(this.typesResult);
           });
    });

    
}


postComments(id:any){
  this.commentListObj_.comment = this.commentForm_.value.comments;
  console.log(this.pid) 
   this.commentForm_.reset()
   let ref = document.getElementById('cancel')
        ref?.click()
  this.requestService.createComment(id,this.commentListObj_).subscribe((res)=>{
    this.collection = res
    console.log(this.collection)
    this.x.navigate(['home','helper','helper'])
  })
}
}