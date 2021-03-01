import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';

import { ParametricSurface } from '../models/parametric-surface';

@Injectable({ providedIn: "root" })
export class ParametricSurfaceService {
  private readonly _psurface = new BehaviorSubject<ParametricSurface>(null);

  // Expose the observable$ part of the _todos subject (read only stream)
  public readonly psurface$ = this._psurface.asObservable();

  get psurface(): ParametricSurface {
    return this._psurface.getValue();
  }

  // assigning a value to this.todos will push it onto the observable 
  // and down to all of its subsribers (ex: this.todos = [])
  set psurface(val: ParametricSurface) {
    this._psurface.next(val);
  }
}