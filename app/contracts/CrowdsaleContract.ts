import { AbstractProvider, parseUnits } from "ethers";
import { EtherscanProvider } from "ethers";
import { BrowserProvider } from "ethers";
import { getCrowdSaleAbi } from "./utils/getAbis";
import { BaseInterface } from "./interfaces";
import { getCrowdSaleAddress } from "./utils/getAddress";

export default class CrowdsaleContract extends BaseInterface {
  constructor(
    provider: BrowserProvider | EtherscanProvider | AbstractProvider
  ) {
    super(provider, getCrowdSaleAddress(), getCrowdSaleAbi());
  }
  async getUsdtRate(): Promise<number> {
    const usdtRate = await this._contract.USDT_rate();
    return this._toNumber(usdtRate);
  }

  async getEthRate(): Promise<number> {
    const ethRate = await this._contract.ETH_rate();
    return this._toNumber(ethRate);
  }
  async buyTokenByUSDT(amount: number) {
    try {
      const tx = await this._contract.byTokenByUSDT(
        parseUnits(amount),
        this._option
      );
      return this._handleTransactionResponse(tx);
    } catch (error) {
      throw error;
    }
  }
}
