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
  selectedPage!: number;

  constructor(private singlePageService: SinglePageService) { }

  ngOnInit(): void {
    this.singlePageService.fetch("past-tournaments").subscribe(res => {
      this.tournaments = res;
      this.tournaments.sort((a, b) => a.year - b.year)
      this.selectedPage = this.tournaments.length - 1;
    })
  }
}
