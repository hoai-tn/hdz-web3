import { parseUnits } from "ethers";
import { ICampaign, ICreateCampaign } from "../types/crowdFunding";
import { BaseInterface } from "./interfaces";
import { ProviderType } from "./interfaces/BaseInterface";
import { getCrowdFundingAbi } from "./utils/getAbis";
import { getCrowdFundingAddress } from "./utils/getAddress";

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
        goal,
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
      return campaign;
    } catch (error) {
      throw error;
    }
  }

  async getAllCampaign() {
    try {
      const numberOfCampaign = await this._contract.count();
      const campaigns = [];
      for (let i = 0; i < numberOfCampaign; i++) {
        campaigns.push(await this.getCampaign(i));
      }
      return campaigns;
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
}
