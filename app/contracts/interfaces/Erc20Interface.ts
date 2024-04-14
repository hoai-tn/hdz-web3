import { AbstractProvider, BigNumberish, EtherscanProvider, InterfaceAbi } from "ethers";
import { BrowserProvider, ContractInterface, ethers } from "ethers";
import BaseInterface from "./BaseInterface";

class Erc20 extends BaseInterface {
  constructor(provider: BrowserProvider | EtherscanProvider | AbstractProvider, address: string, abi: InterfaceAbi) {
    super(provider, address, abi);
  }
  async balanceOf(walletAddress: string): Promise<number> {
    const balance : bigint = await this._contract.balanceOf(walletAddress);
    return this._toNumber(balance);
  }
}

export default Erc20;
