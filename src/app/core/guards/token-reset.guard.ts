import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from "../../services/account.service";

@Injectable({
  providedIn: 'root'
})
export class TokenResetGuard implements CanActivate {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token:String = "";
    const array = route.url.toString().split(",");
    token = array[1];
    this.accountService.getAccountByTokenReset(token).subscribe(
      value => {
      },
      error => {
        this.router.navigateByUrl("/login");
        return false;
      }
    );
    return true;
  }

}
