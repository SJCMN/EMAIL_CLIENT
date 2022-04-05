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
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }

  checkAuth() {
    return this.http
      .get<SignedInResponse>( this.rootUrl + '/auth/signedin')
      .pipe(
        tap(({ authenticated }) => {
          this.signedin$.next(authenticated);
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
   return this.http.post(this.rootUrl + '/auth/signin', credentials)
   .pipe(
     tap(()=>{
       this.signedin$.next(true);
     })
   ) 
  }
}
