import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';

import { ImplicitSurface } from '../models/implicit-surface';

@Injectable({ providedIn: "root" })
export class ImplicitSurfaceService {
  private readonly _isurface = new BehaviorSubject<ImplicitSurface>(null);

  // Expose the observable$ part of the _todos subject (read only stream)
  public readonly isurface$ = this._isurface.asObservable();

  get isurface(): ImplicitSurface {
    return this._isurface.getValue();
  }

  // assigning a value to this.todos will push it onto the observable 
  // and down to all of its subsribers (ex: this.todos = [])
  set isurface(val: ImplicitSurface) {
    this._isurface.next(val);
  }
}