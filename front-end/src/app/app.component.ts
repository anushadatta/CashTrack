import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {

  isErrorDisplayed = false;

  constructor(public router: Router) {

    this.router.events.subscribe(event => {

        if (event instanceof NavigationEnd) {
          console.log('nav end:', event);
        }

    });
  }
}
