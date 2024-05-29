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
  }) {
    console.log({
      title,
      description,
      goal,
      image,
      startDate,
      endDate,
    });
    
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
  }
}
