import { AbstractProvider, BrowserProvider, ethers, EtherscanProvider } from "ethers";
import { Erc20 } from "./interfaces";
import { getHDZAbi } from "./utils/getAbis";
import { getHdzAddress } from "./utils/getAddress";
import { ProviderType } from "./interfaces/BaseInterface";

export default class HDZContract extends Erc20 {
  constructor(provider: ProviderType ) {
    super(provider, getHdzAddress(), getHDZAbi());
  }
}
