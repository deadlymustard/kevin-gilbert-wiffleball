import { ActivatedRoute } from '@angular/router';
import { Tournament } from './../../interfaces/past-tournaments-page';
import { Component, OnInit } from '@angular/core';
import { SinglePageService } from 'src/app/services/single-page.service';

@Component({
  selector: 'app-past-tournaments',
  templateUrl: './past-tournaments.component.html',
  styleUrls: ['./past-tournaments.component.scss']
})
export class PastTournamentsComponent implements OnInit {

  tournaments!: Tournament[];
  selectedYear?: number;
  selectedPage: number = 0;
  images!: any[]

  constructor(
    private singlePageService: SinglePageService,
    private route: ActivatedRoute
  ) { 
    this.route.queryParams.subscribe(params => {
      this.selectedYear = Number(params.get('year'));
    })
  }

  ngOnInit(): void {
    this.singlePageService.fetch("past-tournaments").subscribe(res => {
      this.tournaments = res;
      this.tournaments.sort((a, b) => a.year - b.year)
      console.log(this.selectedYear);
      this.selectedPage = this.tournaments.findIndex(tournament => tournament.year === this.selectedYear) - 1;
      this.images = this.tournaments[this.selectedPage].carousel;
      console.log(this.tournaments);
    })
  }
}
