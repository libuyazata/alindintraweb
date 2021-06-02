import { Observable, of } from 'rxjs';

import { Credentials, LoginContext } from './authentication.service';

export class MockAuthenticationService {

  credentials: Credentials | null = {
    userId : 1, 
    userName: 'test',
    token: '123',
    userRole : 1,
    name : "test user"
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      userId : 1, 
      userName: context.username,
      token: '123456',
      userRole : 1,
      name : "test user"
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

}
