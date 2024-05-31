export interface ICampaign {
  id?: string;
  title: string;
  goal: bigint;
  image: string;
  startDate: number;
  endDate: number;
  description: string;
}
