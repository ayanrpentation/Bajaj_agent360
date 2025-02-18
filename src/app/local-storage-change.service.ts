// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LocalStorageChangeService {

//   constructor() { }
// }



import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageChangeService {
  private storageSubject = new Subject<{ key: string; value: any }>();

  watchStorage() {
    return this.storageSubject.asObservable();
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
    this.storageSubject.next({ key, value });
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}

