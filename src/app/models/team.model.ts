import { Member } from './member.model';

export class Team {
    id?: string;
    name: string = '';
    color: string = '';
    members: Member[] = [];
    league: League = League.COMPETITIVE; 
    registrationFee: string = '';
    paid: boolean = false;
  }
  
  export enum League {
    FRIENDLY = 'Friendly',
    COMPETITIVE = 'Competitive'
  }