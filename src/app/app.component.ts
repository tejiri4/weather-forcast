import { Component, Input, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'weather-app';
  route: ActivatedRoute = inject(ActivatedRoute);
 

  ngOnInit() {
    console.log('app component initialized');
  }

  ngOnDestroy() {
    console.log('app component destroyed');
  }
}
