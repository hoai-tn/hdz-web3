// import {
//   TransactionResponse,
// } from "@ethersproject/abstract-provider";
import {
  AbstractProvider,
  BigNumberish,
  BrowserProvider,
  ContractInterface,
  ethers,
  EtherscanProvider,
  formatEther,
  InterfaceAbi,
  JsonRpcApiProvider,
  JsonRpcSigner,
  Overrides,
  parseEther,
  Signer,
  TransactionResponse,
} from "ethers";

export type ProviderType =
  | BrowserProvider
  | EtherscanProvider
  | AbstractProvider
  | JsonRpcSigner;
export default class BaseInterface {
  _provider: ProviderType;
  _contractAddress: string;
  _abis: InterfaceAbi;
  _contract: ethers.Contract;
  _option: Overrides;

  constructor(provider: ProviderType, address: string, abi: InterfaceAbi) {
    this._provider = provider;
    this._contractAddress = address;
    this._abis = abi;
    this._option = { gasLimit: 1000000 };

    this._contract = new ethers.Contract(address, abi, provider);
  }

  _handleTransactionResponse = async (tx: TransactionResponse) => {
    const recept = await tx.wait();
    return recept?.hash;
  };

  _numberToEth = (amount: number) => {
    return parseEther(amount.toString());
  };

  _toNumber = (bigNumber: BigNumberish) => {
    return Number.parseFloat(formatEther(bigNumber));
  };

  _toEther = (bigNumber: BigNumberish) => {
    return Number.parseFloat(formatEther(bigNumber));
  };

  // _toWei = (amount: number) => {
  //   return ethers.utils.parseUnits(amount.toString());
  // };
}
