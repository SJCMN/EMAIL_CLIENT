import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SigninCredentials{
  username: string;
  password: string;
}

interface SigninResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject<boolean | null>(null);
  userName = '';

  constructor(private http: HttpClient, private router: Router) {}

  usernameAvailable(username: String) {
    return this.http.post<UsernameAvailableResponse>(
      this.rootUrl + '/auth/username',
      {
        username,
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(this.rootUrl + '/auth/signup', credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.userName = username;
        })
      );
  }

  checkAuth() {
    return this.http
      .get<SignedInResponse>( this.rootUrl + '/auth/signedin')
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.userName = username;
        })
      );
  }

  signout() {
    // Navigate user back to signin page
    this.router.navigateByUrl('');
    return this.http.post(this.rootUrl + '/auth/signout', {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SigninCredentials){
   return this.http.post<SigninResponse>(this.rootUrl + '/auth/signin', credentials)
   .pipe(
     tap(({ username })=>{
       this.signedin$.next(true);
       this.userName = username;
     })
   ) 
  }
}
