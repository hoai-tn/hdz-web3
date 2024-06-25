import moment from "moment";
import { CampaignState, ICampaign } from "../types/crowdFunding";

export const showSortAddress = (address?: string): string => {
  return `${address?.substring(0, 4)}...${address?.substring(
    address.length - 4,
    address.length
  )}`;
};

export const showTransactionHash = (tranHash: string) => {
  return `${tranHash?.substring(0, 10)}${"".padStart(
    5,
    "*"
  )}${tranHash?.substring(tranHash.length - 10, tranHash.length)}`;
};

export const formatNumber = (number: number) => {
  return number.toLocaleString("en-US");
};

export const checkAmount = (amount: string): boolean => {
  var patten = /^-?\d*\.?\d*$/;
  return patten.test(amount);
};

export function showShortDescription(text: string, wordLimit: number): string {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
}

export const formatTimestampToDate = (timestamp: number): Date => {
  return moment.unix(timestamp).toDate();
};

export const handleCampaignState = (campaign: ICampaign) => {
  if (
    moment() >= moment(campaign.startAt) &&
    moment() < moment(campaign.endAt)
  ) {
    return CampaignState.Started;
  } else if (moment() > moment(campaign.endAt)) {
    return CampaignState.Ended;
  } else {
    return CampaignState.NotStart;
  }
};

export const handleShowCampaignDayState = (campaign: ICampaign) => {
  switch (campaign.state) {
    case CampaignState.NotStart:
      return moment(campaign.startAt).format("MM-DD-YYYY");
    case CampaignState.Started:
      return moment(campaign.endAt).diff(moment(), "days") + 1;
    case CampaignState.Ended:
      return moment(campaign.endAt).format("MM-DD-YYYY");
  }
};
export const handleShowCampaignStateCard = (state: CampaignState) => {
  switch (state) {
    case CampaignState.NotStart:
      return "Not Start";
    case CampaignState.Started:
      return "Starting";
    case CampaignState.Ended:
      return "Ended";
  }
};

export const handleShowCampaignStateLabel = (state: CampaignState) => {
  switch (state) {
    case CampaignState.NotStart:
      return "Days Start";
    case CampaignState.Started:
      return "Days Left";
    case CampaignState.Ended:
      return "Days Ended";
  }
};
