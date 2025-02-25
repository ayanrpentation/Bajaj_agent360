// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class SessionTimeoutInterceptor implements HttpInterceptor {

//   constructor() {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request);
//   }
// }




import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from './common.service';
import { RestApiService } from './rest-api.service';

@Injectable()
export class SessionTimeoutInterceptor implements HttpInterceptor {
  private readonly TIMEOUT_DURATION = 15 * 60 * 1000; // 15 minutes
  private hasLoggedOut = false;

  userAgentId = this.common.getUserAgentId();

  constructor(private router: Router, private common: CommonService, private rest:RestApiService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const lastActivityTime = sessionStorage.getItem('lastActivityTime');

    if (lastActivityTime) {
      const currentTime = Date.now();
      const timeDifference = currentTime - Number(lastActivityTime);

      // Check if session expired
      if (timeDifference > this.TIMEOUT_DURATION && !this.hasLoggedOut) {
        this.hasLoggedOut = true;
        this.logout();
        sessionStorage.clear();
        localStorage.clear();
        return next.handle(req); // Prevent API execution after logout
      }
    }

    // Update the last activity time on every request
    sessionStorage.setItem('lastActivityTime', Date.now().toString());

    return next.handle(req);
  }

  private logout(): void {
    this.deleteDdos();

    // Clear all session and local storage
    sessionStorage.clear();
    localStorage.clear();

    // Navigate to login page
    this.router.navigate(['/']);
  }

  // private deleteDdos(): void {
  //   // Your DDOS cleanup logic here
  //   console.log('DDOS resources cleaned');
  // }

  private deleteDdos() {
    const data = {
      userAgentId: this.userAgentId    
    }
    this.rest.delete_ddos(data).subscribe((res:any)=>{
      if (res.success) {
        
        sessionStorage.clear();
        localStorage.clear();
      } else {

      }
    });
  }
}

