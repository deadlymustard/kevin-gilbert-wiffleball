import { WiffleBallRulesPage } from './../../interfaces/wiffle-ball-rules-page';
import { Component, OnInit } from '@angular/core';
import { SinglePageService } from 'src/app/services/single-page.service';

@Component({
  selector: 'app-wiffle-ball-rules',
  templateUrl: './wiffle-ball-rules.component.html',
  styleUrls: ['./wiffle-ball-rules.component.scss']
})
export class WiffleBallRulesComponent implements OnInit {

  rules?: WiffleBallRulesPage;

  constructor(private singlePageService: SinglePageService) { }

  ngOnInit(): void {
    this.singlePageService.fetch("wiffle-ball-rules").subscribe(res => {
      this.rules = res;
    })
  }

}
