import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
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
  realPage: number = 1;
  images!: any[]

  constructor(
    private singlePageService: SinglePageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.selectedYear = Number(params['year']);
    })
  }

  ngOnInit(): void {
    this.singlePageService.fetch("past-tournaments").subscribe(res => {
      this.tournaments = res;
      this.tournaments.sort((a, b) => a.year - b.year)
      if (this.selectedYear) {
        this.selectedPage = this.tournaments.findIndex(tournament => tournament.year === this.selectedYear);
      } else {
        this.selectedPage = this.tournaments.length - 1;
        this.selectedYear = this.tournaments[this.selectedPage].year;
        this.navigateToYear(this.selectedYear);
      }
      this.realPage = this.selectedPage + 1;
      this.images = this.tournaments[this.selectedPage].carousel;
    })
  }

  changePage(page: number): void {
    this.realPage = page;
    this.selectedPage = page - 1;
    this.images = this.tournaments[this.selectedPage].carousel;
    this.selectedYear = this.tournaments[this.selectedPage].year;
    this.navigateToYear(this.selectedYear);
  }

  navigateToYear(year: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { year: this.selectedYear },
      queryParamsHandling: 'merge',
    });
  }
}
