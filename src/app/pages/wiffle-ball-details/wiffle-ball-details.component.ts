import { Component, OnInit } from '@angular/core';
import { DetailsPage } from 'src/app/interfaces/wiffle-ball-details-page';
import { SinglePageService } from 'src/app/services/single-page.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wiffle-ball-details',
  templateUrl: './wiffle-ball-details.component.html',
  styleUrls: ['./wiffle-ball-details.component.scss']
})
export class WiffleBallDetailsComponent implements OnInit {

  details?: DetailsPage;

  mapOptions?: google.maps.MapOptions;


  markerPosition?: google.maps.LatLngLiteral | google.maps.LatLng;

  constructor(
    private singlePageService: SinglePageService
  ) { }

  ngOnInit() {
    this.singlePageService.fetch("wiffleball-event-details").subscribe(res => {
      this.details = res.details;
      this.markerPosition = this.details?.location.center as google.maps.LatLngLiteral;
      this.mapOptions = this.details?.location as google.maps.MapOptions;
    })
  }

}
