export class Member {
  name: string = '';
  email?: string;
  phone?: string;
  shirtSize: ShirtSize = ShirtSize.L;
  isCaptain: boolean = false
}

export enum ShirtSize {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL'
}