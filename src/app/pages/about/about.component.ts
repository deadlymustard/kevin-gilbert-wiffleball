import { ImageService } from './../../services/image.service';
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

  strapiApiUrl: String;
  imageSize?: string;
  about?: AboutPage;

  constructor(
    private singlePageService: SinglePageService,
    private imageService: ImageService
  ) {
    this.strapiApiUrl = environment.strapiApiUrl;
  }

  ngOnInit() {
    this.singlePageService.fetch("about").subscribe(res => {
      this.about = res;
      console.log(this.about);
    });
    this.imageService.getImageSize().subscribe(res => this.imageSize = res)
  }
}
