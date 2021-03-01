import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';

import { QuadricSurface } from '../models/quadric-surface';

@Injectable({ providedIn: "root" })
export class QuadricSurfaceService {
  private readonly _qsurface = new BehaviorSubject<QuadricSurface>(null);

  // Expose the observable$ part of the _todos subject (read only stream)
  public readonly qsurface$ = this._qsurface.asObservable();

  get qsurface(): QuadricSurface {
    return this._qsurface.getValue();
  }

  // assigning a value to this.todos will push it onto the observable 
  // and down to all of its subsribers (ex: this.todos = [])
  set qsurface(val: QuadricSurface) {
    this._qsurface.next(val);
  }
}