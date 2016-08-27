import { Component, ViewChild, ViewContainerRef, DynamicComponentLoader, AfterViewInit } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { SplashComponent } from './splash.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('target', {read: ViewContainerRef}) target;

  isAuthenticated: boolean = false;

  constructor(private dcl: DynamicComponentLoader) {}

  ngAfterViewInit() {
    if (this.isAuthenticated) {
      this.dcl.loadNextToLocation(DashboardComponent, this.target);
    } else {
        this.dcl.loadNextToLocation(SplashComponent, this.target);
    }
  };

}
