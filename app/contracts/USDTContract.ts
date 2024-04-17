import {
  AbstractProvider,
  BrowserProvider,
  EtherscanProvider,
} from "ethers";
import { Erc20 } from "./interfaces";
import { getUsdtAbi } from "./utils/getAbis";
import { getUsdtAddress } from "./utils/getAddress";
import { ProviderType } from "./interfaces/BaseInterface";

export default class USDTContract extends Erc20 {
  constructor(
    provider: ProviderType
  ) {
    super(provider, getUsdtAddress(), getUsdtAbi());
  }
}
