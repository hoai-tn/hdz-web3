import {
  AbstractProvider,
  BrowserProvider,
  EtherscanProvider,
} from "ethers";
import { Erc20 } from "./interfaces";
import { getUsdtAbi } from "./utils/getAbis";
import { getUsdtAddress } from "./utils/getAddress";

export default class USDTContract extends Erc20 {
  constructor(
    provider: BrowserProvider | EtherscanProvider | AbstractProvider
  ) {
    super(provider, getUsdtAddress(), getUsdtAbi());
  }
}
