export interface FundraisersPage {
  fundraiserBrief: string;
  fundraisers: FundraiserCardComponent[]
}

interface FundraiserCardComponent {
  image: any;
  title: string;
  routeId: string;
  description: string;
}
