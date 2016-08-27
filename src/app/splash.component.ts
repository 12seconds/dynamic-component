import { Component } from '@angular/core';

@Component({
    selector: 'dynamic',
    template: `
      <h1>I'm the Splash page component</h1>
      <router-outlet></router-outlet>
    `,
})
export class SplashComponent {
}
