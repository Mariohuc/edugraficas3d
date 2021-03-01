import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';

import { Scene3D } from '../models/scene3D';

@Injectable({ providedIn: "root" })
export class PCScene3DService {
  private readonly _pcscene3D = new BehaviorSubject<Scene3D>(null);

  // Expose the observable$ part of the _todos subject (read only stream)
  public readonly pcscene3D$ = this._pcscene3D.asObservable();

  get pcscene3D(): Scene3D {
    return this._pcscene3D.getValue();
  }


  // assigning a value to this.todos will push it onto the observable 
  // and down to all of its subsribers (ex: this.todos = [])
  set pcscene3D(val: Scene3D) {
    this._pcscene3D.next(val);
  }
}