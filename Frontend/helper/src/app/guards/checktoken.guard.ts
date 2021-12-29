import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { ServicehelperService } from '../servicehelper.service';

@Injectable({
  providedIn: 'root'
})
export class ChecktokenGuard implements CanActivate {
  constructor(private userService: ServicehelperService, private router: Router) {}
  canActivate() {
    if (this.userService.loggedIn()) {
      return true;
    }

    this.router.navigate(['/', 'login']);
    
    return false;
  }
}
