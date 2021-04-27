import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent {

  donationAmount: string = '';
  donated: boolean = false;

  paypalConfig: IPayPalConfig = {
    currency: 'USD',
    clientId: environment.paypalApiKey,
    createOrderOnClient: (data: any) => <ICreateOrderRequest> {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.donationAmount,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.donationAmount
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
    onApprove: this.onApprove
  }

  constructor() {}

  onApprove(data: any, actions: any) {
    this.donated = true;
  }
}
