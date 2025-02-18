import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SideNavStatusService {

  constructor() { }

  private stateSubject = new BehaviorSubject<boolean>(false);
  state$ = this.stateSubject.asObservable();

  setState(value: boolean): void {
    this.stateSubject.next(value);
  }
}


