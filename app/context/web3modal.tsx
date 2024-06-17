"use client";

import { setUser } from "@/lib/features/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { ReactNode, useEffect } from "react";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "a190c2407e22a8177a28cfa28283ad16";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};
const testnet = {
  chainId: 11155111,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: process.env.NEXT_PUBLIC_RPC_TESTNET || "",
};
// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet, testnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeMode: "light",
  themeVariables: {
    "--w3m-font-family": "inherit",
  },
});

export function Web3Modal({ children }: { children: ReactNode }) {
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (address && walletProvider) {
      dispatch(
        setUser({
          address,
          walletProvider,
          pledgedAmount: 0,
        })
      );
    } else {
      setUser({
        address: null,
        walletProvider: null,
        pledgedAmount: 0,
      });
    }
  }, [address, walletProvider]);

  return children;
}
