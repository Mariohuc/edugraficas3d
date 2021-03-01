import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';

import { Scene3D } from '../models/scene3D';

@Injectable({ providedIn: "root" })
export class PSScene3DService {
  private readonly _psscene3D = new BehaviorSubject<Scene3D>(null);

  // Expose the observable$ part of the _todos subject (read only stream)
  public readonly psscene3D$ = this._psscene3D.asObservable();

  get psscene3D(): Scene3D {
    return this._psscene3D.getValue();
  }


  // assigning a value to this.todos will push it onto the observable 
  // and down to all of its subsribers (ex: this.todos = [])
  set psscene3D(val: Scene3D) {
    this._psscene3D.next(val);
  }
}