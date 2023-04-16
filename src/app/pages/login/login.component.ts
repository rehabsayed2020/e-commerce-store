import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
// import { NgxSpinnerService } from "ngx-spinner";
// import {AuthService} from "app/shared/auth/auth.service";
import {AuthService} from "../../shared/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    username: new FormControl('admin', [Validators.required]),
    password: new FormControl('admin', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  constructor(private router: Router, private authService: AuthService,
    // private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
      localStorage.clear();
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    // this.spinner.show(undefined,
    //   {
    //     type: 'ball-triangle-path',
    //     size: 'medium',
    //     bdColor: 'rgba(0, 0, 0, 0.8)',
    //     color: '#fff',
    //     fullScreen: true
    //   });

    //  let data = {
    //   "username":this.loginForm.value.username,
    //   "password": this.loginForm.value.password
    //  }

    let data = {
      "username":"mor_2314",
      "password": "83r5^_"
     }

    this.authService.signinUser(data).subscribe((res :any)  => {
      if(this.loginForm.value.username.includes('admin'))
      {
        this.router.navigate(['/products']);
        localStorage.setItem('role', 'admin');


      }

      else if(this.loginForm.value.username.includes('user'))
      {
        this.router.navigate(['/categories']);
        localStorage.setItem('role', 'user');



      }
      else
      {
        this.router.navigate(['/']);

      }
      console.log(res);
      localStorage.setItem('token', res['token']);
        }, error=> {
          // this.router.navigate(['/products']);

       alert('error')
    });



      // .then((res) => {
      //   // this.spinner.hide();
      //   this.router.navigate(['/products']);
      // })
      // .catch((err) => {
      //   this.isLoginFailed = true;
      //   // this.spinner.hide();
      //   console.log('error: ' + err)
      // }
      ;
  }


}
