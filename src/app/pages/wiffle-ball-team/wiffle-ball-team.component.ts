import { mergeMap } from 'rxjs/operators';
import { WiffleBallTeamPage } from './../../interfaces/wiffle-ball-team-page';
import { SinglePageService } from './../../services/single-page.service';
import { TeamService } from './../../services/team.service';
import { PaymentUtils } from './../../utils/payment-utils';
import { ItemizedPayment } from './../../interfaces/itemized-payment';
import { Team } from './../../models/team.model';
import { ActivatedRoute, Data } from '@angular/router';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateOrderRequest, IOnApproveCallbackActions, IOnApproveCallbackData, IPayPalConfig } from 'ngx-paypal';
import { isPlatformBrowser } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-wiffle-ball-team',
  templateUrl: './wiffle-ball-team.component.html',
  styleUrls: ['./wiffle-ball-team.component.scss']
})
export class WiffleBallTeamComponent implements OnInit, AfterViewInit {

  teamId!: string;
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
  ) {
    // this.route.data.subscribe(routeData => {
    //   this.team = routeData.team;
    //   this.teamPaymentFee = PaymentUtils.calculateTeamPayment(this.team);
    // })

  }

  ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = params['id'];
      this.teamService.getTeam(this.teamId).subscribe(team => {
        this.team = team;
        if (this.team) {
          this.team.id = this.teamId;
          this.teamPaymentFee = PaymentUtils.calculateTeamPayment(this.team);
        }
      });
    })
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
