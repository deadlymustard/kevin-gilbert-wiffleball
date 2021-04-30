import { mergeMap } from 'rxjs/operators';
import { WiffleBallTeamPage } from './../../interfaces/wiffle-ball-team-page';
import { SinglePageService } from './../../services/single-page.service';
import { TeamService } from './../../services/team.service';
import { PaymentUtils } from './../../utils/payment-utils';
import { ItemizedPayment } from './../../interfaces/itemized-payment';
import { Team } from './../../models/team.model';
import { ActivatedRoute, Data } from '@angular/router';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateOrderRequest, IOnApproveCallbackActions, IOnApproveCallbackData, IPayPalConfig } from 'ngx-paypal';
import { isPlatformBrowser } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';

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
    private singlePageService: SinglePageService,
    private firestore: AngularFirestore,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const teamId = params.get('id');
      console.log(teamId);
      this.firestore.doc<Team>(`teams/${teamId}`).valueChanges().subscribe(team => {
        this.team = team as Team;
        this.teamPaymentFee = PaymentUtils.calculateTeamPayment(this.team)
      });
    });

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
        this.team.paid = true;
        this.teamService.updateTeam(this.team);
      }
    }
  }

  shouldRenderButton(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return true;
    } else {
      return false;
    }
  }
}
