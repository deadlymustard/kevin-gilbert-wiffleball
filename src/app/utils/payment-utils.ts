import { ItemizedPayment } from '../interfaces/itemized-payment';
import { League, Team } from '../models/team.model';

export class PaymentUtils {

  static BASE_MEMBERS_FRIENDLY = 5;
  static BASE_MEMBERS_COMPETITIVE = 4;

  static BASE_FEE = 120;
  static ADDITIONAL_MEMBERS_FEE = 30;

  static PAYPAL_PERCENTAGE_FEE = .029;
  static PAYPAL_BASE_FEE = .30;

  public static calculateTeamPayment(team: Team): ItemizedPayment {
    const baseNumberOfMembers: number = (team.league === League.COMPETITIVE) ? this.BASE_MEMBERS_COMPETITIVE : this.BASE_MEMBERS_FRIENDLY;
    const numberOfAdditionalMembers: number = team.members.length - baseNumberOfMembers;

    const basePrice = this.BASE_FEE + (numberOfAdditionalMembers * this.ADDITIONAL_MEMBERS_FEE);
    const netPrice = (basePrice + this.PAYPAL_BASE_FEE) / (1.0 - this.PAYPAL_PERCENTAGE_FEE);
    const transactionFee = (netPrice - basePrice);
    const pricePerAdditionalMember = this.ADDITIONAL_MEMBERS_FEE;

    return {
      basePrice,
      netPrice,
      numberOfAdditionalMembers,
      pricePerAdditionalMember,
      transactionFee,
    } as ItemizedPayment;
  }
}
