export interface WiffleBallTeamPage {
  congratulations: string;
  teamHasPaid: string;
  payAtEvent: PaymentMethodCardComponent;
  payByCheck: PaymentMethodCardComponent;
  payOnline: PaymentMethodCardComponent;
}

export interface PaymentMethodCardComponent {
  header: string;
  body: string;
}
