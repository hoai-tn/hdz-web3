import { formatNumber } from '@/app/utils';
export interface ICampaign {
  id: number;
  creator: string;
  pledged: number;
  title: string;
  goal: number;
  image: string;
  startAt: Date;
  endAt: Date;
  description: string;
  claimed: boolean;
  
}

export interface ICreateCampaign {
  title: string;
  goal: number;
  image: string;
  startDate: number;
  endDate: number;
  description: string;
}
export enum CampaignState {
  None,
  NotStart,
  Started,
  Ended,
}