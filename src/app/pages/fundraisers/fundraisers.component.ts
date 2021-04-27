import { ImageService } from './../../services/image.service';
import { Component, OnInit } from '@angular/core';
import { FundraisersPage } from 'src/app/interfaces/fundraisers-page';
import { SinglePageService } from 'src/app/services/single-page.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fundraisers',
  templateUrl: './fundraisers.component.html',
  styleUrls: ['./fundraisers.component.scss']
})
export class FundraisersComponent implements OnInit {

  strapiApiUrl: string;
  fundraisers?: FundraisersPage;
  imageSize!: string;

  constructor(
    private singlePageService: SinglePageService,
    private imageService: ImageService
  ) {
    this.strapiApiUrl = environment.strapiApiUrl;
  }

  ngOnInit() {
    this.singlePageService.fetch("fundraisers").subscribe(res => {
      this.fundraisers = res;
    })
    this.imageService.getImageSize().subscribe(res => this.imageSize = res)
  }
}
