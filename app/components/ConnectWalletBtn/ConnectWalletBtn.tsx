import { Button, ButtonProps } from "@mui/material";
import React, { ReactNode } from "react";
import { useWeb3Modal } from "@web3modal/ethers5/react";

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
}
const ConnectWalletBtn = ({ children, ...props }: CustomButtonProps) => {
  const { open } = useWeb3Modal();

  return (
    <Button {...props} onClick={() => open()}>
      {children}
    </Button>
  );
};

export default ConnectWalletBtn;
