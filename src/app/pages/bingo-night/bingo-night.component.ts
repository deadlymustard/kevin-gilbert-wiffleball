import { Component, OnInit } from '@angular/core';
import { DetailsPage } from 'src/app/interfaces/wiffle-ball-details-page';
import { SinglePageService } from 'src/app/services/single-page.service';

@Component({
  selector: 'app-bingo-night',
  templateUrl: './bingo-night.component.html',
  styleUrls: ['./bingo-night.component.scss']
})
export class BingoNightComponent implements OnInit {

  details?: DetailsPage;
  mapOptions?: google.maps.MapOptions;
  markerPosition?: google.maps.LatLngLiteral | google.maps.LatLng;

  constructor(private singlePageService: SinglePageService) { }

  ngOnInit(): void {
    this.singlePageService.fetch("bingo-night-details").subscribe(res => {
      this.details = res.details;
      this.markerPosition = this.details?.location.center as google.maps.LatLngLiteral;
      this.mapOptions = this.details?.location as google.maps.MapOptions;
    })
  }

}
