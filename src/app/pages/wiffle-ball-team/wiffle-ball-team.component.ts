import { WiffleBallTeamPage } from './../../interfaces/wiffle-ball-team-page';
import { SinglePageService } from './../../services/single-page.service';
import { TeamService } from './../../services/team.service';
import { PaymentUtils } from './../../utils/payment-utils';
import { ItemizedPayment } from './../../interfaces/itemized-payment';
import { Team } from './../../models/team.model';
import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateOrderRequest, IOnApproveCallbackActions, IOnApproveCallbackData, IPayPalConfig } from 'ngx-paypal';

@Component({
  selector: 'app-wiffle-ball-team',
  templateUrl: './wiffle-ball-team.component.html',
  styleUrls: ['./wiffle-ball-team.component.scss']
})
export class WiffleBallTeamComponent implements OnInit {

  team!: Team;
  teamPaymentFee!: ItemizedPayment;
  paypalConfig!: IPayPalConfig;
  wiffleBallTeamPage?: WiffleBallTeamPage;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private singlePageService: SinglePageService
  ) {
    this.route.data.subscribe((data: Data) => {
      this.team = data.team;
      this.teamPaymentFee = PaymentUtils.calculateTeamPayment(this.team);
    });
  }

  ngOnInit(): void {
    this.singlePageService.fetch("wiffle-ball-team-payment").subscribe(res => {
      this.wiffleBallTeamPage = res;
    });

    this.paypalConfig = {
      currency: 'USD',
      clientId: environment.paypalApiKey,
      createOrderOnClient: (data: any) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.team.registrationFee.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.team.registrationFee.toFixed(2)
                }
              }
            }
          }
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        }
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data: IOnApproveCallbackData, actions: IOnApproveCallbackActions) => {
        console.log(this.team);
        this.team.paid = true;
        this.teamService.updateTeam(this.team);
      }
    }
  }
}
