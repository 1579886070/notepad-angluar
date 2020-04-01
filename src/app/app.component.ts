import { Component } from '@angular/core';
import { SessionService } from './service/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public session: SessionService, public router: Router) { }
  title = 'notepadWeb';

  public index = 1;
  public backgroundImg = '';

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.backgroundImg = '../assets/local/' + Number(Math.random() * 10).toFixed(0) + '.jpg';
  }

  exit() {
    this.session.remove('user');
    this.router.navigate(['home']);
  }
}



