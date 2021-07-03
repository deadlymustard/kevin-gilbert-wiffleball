export interface ItemizedPayment {
  basePrice: number;
  netPrice: number;
  numberOfAdditionalMembers: number;
  pricePerAdditionalMember: number;
  transactionFee: number;
}
