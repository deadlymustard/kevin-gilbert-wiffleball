import {Member} from "./member";

export enum League {
  FRIENDLY = 'Friendly',
  COMPETITIVE = 'Competitive'
}

export class Team {
  id: string;
  name: string;
  color: string;
  members: Member[];
  league: League;
  registrationFee: string;
  paid: boolean;

  constructor() {
    this.id = '';
    this.name = '';
    this.color = '';
    this.members = [];
    this.league = League.COMPETITIVE;
    this.registrationFee = '';
    this.paid = false;
  }
}
