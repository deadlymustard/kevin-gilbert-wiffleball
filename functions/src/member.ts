export enum ShirtSize {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL'
}

export class Member {
  name: string;
  email?: string;
  phone?: string;
  shirtSize: ShirtSize;
  isCaptain: boolean;

  constructor() {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.shirtSize = ShirtSize.M;
    this.isCaptain = false;
  }
}
