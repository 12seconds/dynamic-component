import { Component, Inject, ViewChild, ViewContainerRef, DynamicComponentLoader, OnInit, AfterViewInit } from '@angular/core';
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
  @ViewChild('target', {read: ViewContainerRef}) target;

  isAuthenticated: boolean = false;

  constructor(private dcl: DynamicComponentLoader,
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
        if (currentRoute.indexOf('login')) {
          this.document.getElementById('theme').setAttribute('href', 'default.css');
        } else {
          this.document.getElementById('theme').setAttribute('href', 'admin.css');
        }
    });
  };

  ngAfterViewInit(): void {
    if (this.isAuthenticated) {
      this.dcl.loadNextToLocation(DashboardComponent, this.target);
    } else {
        this.dcl.loadNextToLocation(SplashComponent, this.target);
    }
  };

}
