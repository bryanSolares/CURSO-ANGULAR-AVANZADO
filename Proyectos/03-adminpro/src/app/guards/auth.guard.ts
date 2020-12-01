import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private userService: UsuarioService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.userService.validateToken().pipe(
      tap((response) => {
        if (!response) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.validateToken().pipe(
      tap((response) => {
        if (!response) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
