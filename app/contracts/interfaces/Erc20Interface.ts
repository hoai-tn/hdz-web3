import {
  AbstractProvider,
  BigNumberish,
  EtherscanProvider,
  InterfaceAbi,
  Signer,
  formatUnits,
  parseUnits,
} from "ethers";
import { BrowserProvider, ContractInterface, ethers } from "ethers";
import BaseInterface, { ProviderType } from "./BaseInterface";

class Erc20 extends BaseInterface {
  constructor(provider: ProviderType, address: string, abi: InterfaceAbi) {
    super(provider, address, abi);
  }
  async balanceOf(walletAddress: string): Promise<number> {
    const balance: bigint = await this._contract.balanceOf(walletAddress);
    return this._toNumber(balance);
  }
  async approve(spender: string, value: number) {
    try {
      await this._contract.approve(
        spender,
        parseUnits(value.toString()),
        this._option
      );
    } catch (error) {
      throw error;
    }
  }
  async allowance(owner: string, spender: string): Promise<number> {
    try {
      const allowanceAmount = await this._contract.allowance(owner, spender);
      return this._toNumber(allowanceAmount);
    } catch (error) {
      throw error;
    }
  }
}

export default Erc20;
