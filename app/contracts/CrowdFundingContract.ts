import { parseUnits } from "ethers";
import { ICampaign, ICreateCampaign } from "../types/crowdFunding";
import { BaseInterface } from "./interfaces";
import { ProviderType } from "./interfaces/BaseInterface";
import { getCrowdFundingAbi } from "./utils/getAbis";
import { getCrowdFundingAddress } from "./utils/getAddress";
import { formatTimestampToDate, handleCampaignState } from "../utils";

export default class CrowdFundingContract extends BaseInterface {
  constructor(provider: ProviderType) {
    super(provider, getCrowdFundingAddress(), getCrowdFundingAbi());
  }
  async createCampaign({
    title,
    description,
    goal,
    image,
    startDate,
    endDate,
  }: ICreateCampaign) {
    try {
      const tx = await this._contract.launch(
        title,
        description,
        image,
        parseUnits(goal.toString(), 18),
        startDate,
        endDate,
        this._option
      );
      return this._handleTransactionResponse(tx);
    } catch (error) {
      throw error;
    }
  }

  async getCampaign(id: number) {
    try {
      const campaign = await this._contract.campaigns(id);
      return {
        id,
        creator: campaign.creator,
        title: campaign.title,
        goal: this._toNumber(campaign.goal),
        pledged: this._toNumber(campaign.pledged),
        image: campaign.image,
        startAt: formatTimestampToDate(Number(campaign.startAt)),
        endAt: formatTimestampToDate(Number(campaign.endAt)),
        description: campaign.description,
        claimed: campaign.claimed,
        state: handleCampaignState(campaign),
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllCampaign(): Promise<ICampaign[]> {
    try {
      const numberOfCampaign = await this._contract.count();
      const campaigns = [];
      for (let id = 1; id <= numberOfCampaign; id++) {
        const campaign = await this.getCampaign(id);
        if (campaign.goal && campaign.title) campaigns.push(campaign);
      }
      return campaigns;
    } catch (error) {
      throw error;
    }
  }
  async getPledgedAmount(campaign: number, userAddress: string) {
    try {
      const amount = await this._contract.pledgedAmount(campaign, userAddress);
      return this._toNumber(amount);
    } catch (error) {
      throw error;
    }
  }
  async pledge(campaign: number, amount: number) {
    try {
      const tx = await this._contract.pledge(
        campaign,
        parseUnits(amount.toString(), 18),
        this._option
      );
      return this._handleTransactionResponse(tx);
    } catch (error) {
      throw error;
    }
  }
  async unPledge(campaign: number, amount: number) {
    try {
      const tx = await this._contract.unPledge(
        campaign,
        parseUnits(amount.toString(), 18),
        this._option
      );
      return this._handleTransactionResponse(tx);
    } catch (error) {
      throw error;
    }
  }
  async claim(campaign: number, amount: number) {
    try {
      const tx = await this._contract.unPledge(
        campaign,
        parseUnits(amount.toString(), 18),
        this._option
      );
      return this._handleTransactionResponse(tx);
    } catch (error) {
      throw error;
    }
  }
  async cancel(campaign: number) {
    try {
      const tx = await this._contract.cancel(campaign, this._option);
      return this._handleTransactionResponse(tx);
    } catch (error) {
      throw error;
    }
  }

  async refund(campaign: number, amount: number) {
    try {
      const tx = await this._contract.unPledge(
        campaign,
        parseUnits(amount.toString(), 18),
        this._option
      );
      return this._handleTransactionResponse(tx);
    } catch (error) {
      throw error;
    }
  }
}
