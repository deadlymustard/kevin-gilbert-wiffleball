import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  onApprove(data: any, actions: any) {
    this.donated = true;
    return actions.order.capture().then((details: any) => {
      // This function shows a transaction success message to your buyer.
      alert('Purchase Completed By:  ' + details.payer.name.given_name);
    });
  }

  shouldRenderButton(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return true;
    } else {
      return false;
    }
  }
}
