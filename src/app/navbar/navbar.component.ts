import { ImageService } from './../services/image.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  ktgLogoBaseUrl = 'https://res.cloudinary.com/kevin-gilbert-scholarship-fund/image/upload/v1619536633/:size:_logo_360657fbfb.png';
  ktgSplashBaseUrl ='https://res.cloudinary.com/kevin-gilbert-scholarship-fund/image/upload/v1619536621/:size:_baseball_5110ccc265.jpg';

  ktgLogoFinalUrl = '';
  ktgSplashFinalUrl = '';

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.getImageSize().subscribe(imageSize => {
      this.ktgLogoFinalUrl = this.ktgLogoBaseUrl.replace(':size:', imageSize);
      this.ktgSplashFinalUrl = this.ktgSplashBaseUrl.replace(':size:', imageSize);
    });
  }

  public isMenuCollapsed = true
}
