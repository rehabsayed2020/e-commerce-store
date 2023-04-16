import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
   apiUrl = environment.apiUrl;
  constructor(private _httpClient :HttpClient) {
    console.log("api" , this.apiUrl)
  }

  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }

  signinUser(data:any) {
    //your code for checking credentials and getting tokens for for signing in user
    // return this._firebaseAuth.signInWithEmailAndPassword(email, password)

    //uncomment above firebase auth code and remove this temp code
    return this._httpClient.post(`${this.apiUrl}/auth/login`, data)

    // return new Promise(function (resolve, reject) {
    //   setTimeout(function () {
    //     resolve(true);
    //   }, 1000);
    // });

  }

  logout() {
    // this._firebaseAuth.signOut();
    // this.router.navigate(['YOUR_LOGOUT_URL']);
  }

  isAuthenticated(){
   let token = localStorage.getItem('token');
    if(token)
    {
      console.log('yes token')
      return true;
    }
    else
    {
      console.log('no token')

      return false;
    }

  }
}
