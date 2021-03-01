import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';

import { Scene3D } from '../models/scene3D';

@Injectable({ providedIn: "root" })
export class QSScene3DService {
  private readonly _qsscene3D = new BehaviorSubject<Scene3D>(null);

  // Expose the observable$ part of the _todos subject (read only stream)
  public readonly qsscene3D$ = this._qsscene3D.asObservable();

  get qsscene3D(): Scene3D {
    return this._qsscene3D.getValue();
  }


  // assigning a value to this.todos will push it onto the observable 
  // and down to all of its subsribers (ex: this.todos = [])
  set qsscene3D(val: Scene3D) {
    this._qsscene3D.next(val);
  }
}