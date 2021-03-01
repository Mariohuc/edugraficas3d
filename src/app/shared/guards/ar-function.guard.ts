import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

import { FScene3DService } from "../services/fscene3D.service";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ArFunctionGuard implements CanActivate {
  constructor(private scene3DService: FScene3DService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.scene3DService.fscene3D$.pipe(
      take(1),
      map((fscene3d) => {
        if(!fscene3d){
          console.error("Scene is null");      
          this.router.navigate(["/vr/function-grapher"]);
          return false;
        }
        return true;
      })
    );
  }
}
