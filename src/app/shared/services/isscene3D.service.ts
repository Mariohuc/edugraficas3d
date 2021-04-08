import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';

import { Scene3D } from '../models/scene3D';

@Injectable({ providedIn: "root" })
export class ISScene3DService {
  private readonly _isscene3D = new BehaviorSubject<Scene3D>(null);

  // Expose the observable$ part of the _todos subject (read only stream)
  public readonly isscene3D$ = this._isscene3D.asObservable();

  get isscene3D(): Scene3D {
    return this._isscene3D.getValue();
  }


  // assigning a value to this.todos will push it onto the observable 
  // and down to all of its subsribers (ex: this.todos = [])
  set isscene3D(val: Scene3D) {
    this._isscene3D.next(val);
  }
}