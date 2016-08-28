import { Component, Inject, ViewChild, ViewContainerRef, ComponentResolver, ReflectiveInjector, OnInit, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Location } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SplashComponent } from './splash.component';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('target', {read: ViewContainerRef}) target: ViewContainerRef;

  isAuthenticated: boolean = true;

  constructor(private cmpResolver: ComponentResolver,
    @Inject(DOCUMENT) private document,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.router.events
      .filter(event => event instanceof  RoutesRecognized)
      .subscribe(event => {
        let routesRecognized = (<RoutesRecognized>event);

        let currentRoute = routesRecognized.url;
        console.log(currentRoute.indexOf('login'));
        if (currentRoute.indexOf('login') > 0) {
          this.document.getElementById('theme').setAttribute('href', 'default.css');
        } else {
          this.document.getElementById('theme').setAttribute('href', 'admin.css');
        }
    });
  };

  ngAfterViewInit(): void {
    // NOTE: Move this to OnInit instead?
    if (this.isAuthenticated) {
      this.cmpResolver.resolveComponent(DashboardComponent)
        .then((factory) => {
          const injector = ReflectiveInjector.fromResolvedProviders([], this.target.parentInjector);
          this.target.createComponent(factory, 0, injector, []);
        });
    } else {
      this.cmpResolver.resolveComponent(SplashComponent)
        .then((factory) => {
          const injector = ReflectiveInjector.fromResolvedProviders([], this.target.parentInjector);
          this.target.createComponent(factory, 0, injector, []);
        });
    }
  };
}
