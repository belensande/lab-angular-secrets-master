import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {
  formInfo: any = {
    username: "",
    password: "",
    name: "",
    secret: ""
  };
  error: string;

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    this.sessionService.isLogged()
      .subscribe(
      (user) => {
        this.router.navigate(['/private']);
      });
  }

  signup() {
    this.sessionService.signup(this.formInfo)
      .subscribe(
      (user) => this.successCb(user),
      (err) => this.errorCb(err)
      );
  }

  errorCb(err) {
    this.error = err;
  }

  successCb(user) {
    this.router.navigate(['/private']);
  }
}
