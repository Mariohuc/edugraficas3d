import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';

import { ParametricCurve } from '../models/parametric-curve';

@Injectable({ providedIn: "root" })
export class ParametricCurveService {
  private readonly _pcurve = new BehaviorSubject<ParametricCurve>(null);

  // Expose the observable$ part of the _todos subject (read only stream)
  public readonly pcurve$ = this._pcurve.asObservable();

  get pcurve(): ParametricCurve {
    return this._pcurve.getValue();
  }

  // assigning a value to this.todos will push it onto the observable 
  // and down to all of its subsribers (ex: this.todos = [])
  set pcurve(val: ParametricCurve) {
    this._pcurve.next(val);
  }
}