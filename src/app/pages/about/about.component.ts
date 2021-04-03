import { Component, OnInit } from '@angular/core';
import { AboutPage } from 'src/app/interfaces/about-page';
import { SinglePageService } from 'src/app/services/single-page.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  strapiApiUrl: string;
  about?: AboutPage;

  constructor(
    private singlePageService: SinglePageService
  ) {
    this.strapiApiUrl = environment.strapiApiUrl;
  }

  ngOnInit() {
    this.singlePageService.fetch("about").subscribe(res => {
      this.about = res;
    })
  }

}
