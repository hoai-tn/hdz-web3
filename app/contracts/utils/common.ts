const env = process.env;

export const PUBLIC_CHAIN_ID = env.NEXT_PUBLIC_CHAIN_ID
export const RPC_TESTNET = env.NEXT_PUBLIC_RPC_TESTNET
export const RPC_MAINNET = env.NEXT_PUBLIC_RPC_TESTNET

export type AddressType = {
  11155111: string;
  1: string;
};

export enum CHAIN_ID {
  TESTNET = 11155111,
  MAINNET = 1,
}

export default function getChainIdFromEnv(): number {
  if (!env) {
    return Number(PUBLIC_CHAIN_ID);
  }
  return CHAIN_ID.TESTNET;
}

export const getRPC = () => {
  if (getChainIdFromEnv() === CHAIN_ID.MAINNET)
    return RPC_TESTNET;
  return RPC_TESTNET;
};
export const SMART_ADDRESS = {
  CROWD_SALE: { 11155111: "0x264FF69Ece7F1cA80489077C83923BB6b494b605", 1: "" },
  USDT: { 11155111: "0x3457d5F96Ebb81509FF5cdd6Ce31a32489899c56", 1: "" },
  NFT: { 11155111: "0xeFe14Edd8adb233784A3124F39B31367d7066E61", 1: "" },
  MARKET: { 11155111: "0x52620b7782F2217De0fA3f0193224cfb1DF7Ba8F", 1: "" },
  AUCTION: { 11155111: "0x9eC705fEF884bdB6382507B3CA544e21FBB66177", 1: "" },
  HDZ: { 11155111: "0x3b85520B19e94DB3Fd32e8717C3A50308dd3063a", 1: "" },
  CROWD_FUNDING: { 11155111: "0xC02778fd1f5eAE89Fd524f7DA8FbAD829230bdf2", 1: "" },
};
