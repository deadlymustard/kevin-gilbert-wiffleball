import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from "@angular/cdk/layout";
import { Router, RouterEvent, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-wiffle-ball',
  templateUrl: './wiffle-ball.component.html',
  styleUrls: ['./wiffle-ball.component.scss']
})
export class WiffleBallComponent implements OnInit {

  isMobile: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe('(max-width: 992px)').subscribe(collapsed => {
      this.isMobile = collapsed.matches;
    });
  }

}
