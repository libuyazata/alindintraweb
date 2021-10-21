import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { NgxSpinnerService } from 'ngx-spinner';

import { AuthenticationService } from './../authentication/authentication.service';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

    
  constructor(private spinner: NgxSpinnerService, private authService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    const authToken = this.authService.getToken();
    
    if(authToken){
      request = request.clone({
        url: environment.serverUrl + request.url,
        setHeaders: {
          Authorization: `token ${authToken}`,
          "token" : authToken
        }
      });
    } else {
      request = request.clone({
        url: environment.serverUrl + request.url
      });
    }
    return next.handle(request);
  }

}

