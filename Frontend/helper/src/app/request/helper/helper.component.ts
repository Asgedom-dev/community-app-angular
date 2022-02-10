import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServicehelperService } from 'src/app/servicehelper.service';

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.css']
})
export class HelperComponent implements OnInit {
  requestList:any
  sub!:Subscription;
  sub2!:Subscription;
  pid:string='';
  paramreturn:string=''
  commentParamReturn:string=''
  typesResult:any[]=[]
  commentResult:any;
  data: any;
  types:any;
  collection: any;
  date:any;
  public commentForm !: FormGroup;

  commentListObj:{
    id :string;
    comment :string
}={
  id:'',
  comment:''
}
  constructor(private formBuilder: FormBuilder,private requestService:ServicehelperService,private routers:Router,private router: ActivatedRoute,private http: HttpClient) { }

  
  ngOnInit(): void {
  
    this.commentForm = this.formBuilder.group({
      comments:[''],
    })
 

    this.sub = this.router.paramMap.subscribe((params) => {
      console.log(params.get('types'))
      this.paramreturn = params.get('types') as string 
      this.sub= this.requestService.getByTypes(this.paramreturn).subscribe((u: any) => {
        this.typesResult=u.getHelper
        console.log(this.typesResult)
           });
    });
  }

  
  postComment(id:any){
    this.commentListObj.comment = this.commentForm.value.comments;
    console.log(this.pid) 
     this.commentForm.reset()
    this.requestService.createComment(id,this.commentListObj).subscribe((res)=>{
      this.collection = res
      
    this.routers.navigate(['/','home','service','service'])
    })
  }
}
