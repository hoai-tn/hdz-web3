import { AbstractProvider, BrowserProvider, ethers, EtherscanProvider } from "ethers";
import { Erc20 } from "./interfaces";
import { getHDZAbi } from "./utils/getAbis";
import { getCTCAddress } from "./utils/getAddress";
import { ProviderType } from "./interfaces/BaseInterface";

export default class CTCContract extends Erc20 {
  constructor(provider: ProviderType ) {
    super(provider, getCTCAddress(), getHDZAbi());
  }
}
