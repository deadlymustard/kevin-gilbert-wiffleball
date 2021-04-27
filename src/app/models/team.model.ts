import { Member } from './member.model';

export class Team {
    id?: String;
    name: String = '';
    color: String = '';
    members: Member[] = [];
    league: League = League.COMPETITIVE;
    registrationFee: Number = 125;
    paid: boolean = false;
    year?: number;
  }

  export enum League {
    FRIENDLY = 'Friendly',
    COMPETITIVE = 'Competitive'
  }
