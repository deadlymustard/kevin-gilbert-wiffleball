import { Component, OnInit } from '@angular/core';
import { SinglePageService } from './services/single-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kevin-gilbert-wiffleball';
  details: any;

  constructor() {
    console.log('hey');
  }

  ngOnInit() {
  }
}
