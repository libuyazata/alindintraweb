import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '../logger.service';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log("LoaderInterceptor");
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', response);
    }
    throw response;
  }

}



// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';


// @Injectable()
// export class LoaderInterceptor implements HttpInterceptor {
//     private currentRequests: number;
//     constructor() {
//         this.currentRequests = 0;
//     }
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(request)
//         .pipe(
//             tap((event: HttpEvent<any>) => {
//                 if (event instanceof HttpResponse) {                            
//                     this.decrementRequestCount();                            
//                 }
//             }, (err: any) => {                        
//                 this.currentRequests = 0;
//             })
//         );
//     }
//     private decrementRequestCount() {
//         if (--this.currentRequests === 0) {
//             console.log("decrementRequestCount" + this.currentRequests);
//             //this._loaderService._toggleLoader.emit(false);
//         }
//     }

//     private incrementRequestCount() {
//         if (this.currentRequests++ === 0) {
//             console.log("incrementRequestCount" + this.currentRequests);
//             //this._loaderService._toggleLoader.emit(true);
//         }
//     }
// }