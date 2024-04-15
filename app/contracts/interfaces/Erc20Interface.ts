import {
  AbstractProvider,
  BigNumberish,
  EtherscanProvider,
  InterfaceAbi,
  formatUnits,
  parseUnits,
} from "ethers";
import { BrowserProvider, ContractInterface, ethers } from "ethers";
import BaseInterface from "./BaseInterface";

class Erc20 extends BaseInterface {
  constructor(
    provider: BrowserProvider | EtherscanProvider | AbstractProvider,
    address: string,
    abi: InterfaceAbi
  ) {
    super(provider, address, abi);
  }
  async balanceOf(walletAddress: string): Promise<number> {
    const balance: bigint = await this._contract.balanceOf(walletAddress);
    return this._toNumber(balance);
  }
  async approve(spender, value) {
    try {
      await this._contract.approve(spender, parseUnits(value), this._option);
    } catch (error) {
      throw error;
    }
  }
}

export default Erc20;
