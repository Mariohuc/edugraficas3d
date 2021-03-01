import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';

import { Function } from '../models/function';

@Injectable({ providedIn: "root" })
export class FunctionService {
  private readonly _function = new BehaviorSubject<Function>(null);

  // Expose the observable$ part of the _todos subject (read only stream)
  public readonly function$ = this._function.asObservable();

  get function(): Function {
    return this._function.getValue();
  }

  // assigning a value to this.todos will push it onto the observable 
  // and down to all of its subsribers (ex: this.todos = [])
  set function(val: Function) {
    this._function.next(val);
  }
}