import { Component, OnInit } from '@angular/core';
import { SessionService } from "./../session.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-private-page',
  templateUrl: './my-private-page.component.html',
  styleUrls: ['./my-private-page.component.css']
})
export class MyPrivatePageComponent implements OnInit {
  username: string = "";
  secret: string = "";
  error: string;

  constructor(private session: SessionService, private router: Router ) { }

  ngOnInit() {
    this.session.isLogged()
      .subscribe(
      (user) => {
        this.username = user.username;
        this.secret = user.secret;
      },
      (error) => {
        this.router.navigate(['/login']);
      });
  }
}
