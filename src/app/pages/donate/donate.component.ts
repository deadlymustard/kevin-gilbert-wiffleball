import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  public donationAmount: string = '';

  public paypalConfig = <IPayPalConfig> {
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
    onApprove: (data: any, actions: any) => {
      console.log("Paid!");
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
