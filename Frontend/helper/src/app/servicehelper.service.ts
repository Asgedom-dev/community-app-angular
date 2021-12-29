import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicehelperService {
  baseURL = 'http://localhost:5000/posts';
  baseUserURL = 'http://localhost:5000/users/login';

 constructor(private http: HttpClient) { }
 
 
 
 getAllRequest(){
  return this.http.get(this.baseURL)
 }
 
 getByTypes(types:any){
   return this.http.get(`${this.baseURL}/${types}`);
 }

 create(data:any){
   return this.http.post(this.baseURL, data);
 }

// http://localhost:5000/posts/61b8184255b6ee209529f6be/comment
createComment(pid:any,data:any){
    return this.http.put(`http://localhost:5000/posts/${pid}/comment`, data);
}
// createComment(pid:any,data:any){
//     return this.http.put(`${this.baseURL}/${pid}/comment`, data);
// }

getById(pid:any,cid:any){
  return this.http.get(`${this.baseURL}/${pid}/comment/${cid}`);
}
// http://localhost:5000/posts/user/61b52a217291d68b43ee1849
getUserById(id:any){
  return this.http.get(`http://localhost:5000/posts/user/${id}`);
}

createPosts(data:any){
  return this.http.post(`${this.baseURL}/newpost`,data);
}

 login(data:any){
   return this.http.post(`http://localhost:5000/users/login`, data);
 }

getToken(){
  return localStorage.getItem('token')
}

loggedIn(){
   return !!localStorage.getItem('token')
 }

updateUser(cid:any,data:any){
  return this.http.post(`http://localhost:5000/posts/user/${cid}`, data);
}



}
