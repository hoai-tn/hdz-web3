import { AbstractProvider, BrowserProvider, ethers, EtherscanProvider } from "ethers";
import { Erc20 } from "./interfaces";
import { getHDZAbi } from "./utils/getAbis";
import { getHdzAddress } from "./utils/getAddress";

export default class HDZContract extends Erc20 {
  constructor(provider: BrowserProvider | EtherscanProvider | AbstractProvider) {
    super(provider, getHdzAddress(), getHDZAbi());
  }
}
