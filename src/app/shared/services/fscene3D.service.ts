import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';

import { Scene3D } from '../models/scene3D';

@Injectable({ providedIn: "root" })
export class FScene3DService {
  private readonly _fscene3D = new BehaviorSubject<Scene3D>(null);

  // Expose the observable$ part of the _todos subject (read only stream)
  public readonly fscene3D$ = this._fscene3D.asObservable();

  get fscene3D(): Scene3D {
    return this._fscene3D.getValue();
  }


  // assigning a value to this.todos will push it onto the observable 
  // and down to all of its subsribers (ex: this.todos = [])
  set fscene3D(val: Scene3D) {
    this._fscene3D.next(val);
  }
}