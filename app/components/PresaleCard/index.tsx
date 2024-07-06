"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  ChangeEvent,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { BrowserProvider, JsonRpcProvider } from "ethers";

import { checkAmount, formatNumber, showTransactionHash } from "@/app/utils";
import PresaleTime from "./PresaleTime";
import { getCrowdSaleAddress } from "@/app/contracts/utils/getAddress";
import { RPC_TESTNET, getRPC } from "@/app/contracts/utils/common";
import CrowdsaleContract from "@/app/contracts/CrowdsaleContract";
import CrowdsaleProgressBar from "./CrowdsaleProgressBar";
import Image from "next/image";
import USDTContract from "@/app/contracts/USDTContract";
import Link from "next/link";
import CTCContract from "@/app/contracts/CTCContract";
import Loader from "../Loader";

import {
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const PresaleCard = () => {
  const [buyMethod, setBuyMethod] = useState<String>("ETH");
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const [tokenBalance, setTokenBalance] = useState(0);
  const [usdtBalanceOfWallet, setUsdtBalanceOfWallet] = useState(0);
  const [ethBalanceOfWallet, setEthBalanceOfWallet] = useState(0);

  const [crowdBalance, setCrowdBalance] = useState(0);

  const [usdtRate, setUsdtRate] = useState(0);
  const [ethRate, setEthRate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [amountBuy, setAmountBuy] = useState<any>(0);
  const [amountTokenReceive, setAmountTokenReceive] = useState(0);
  const [hash, setHash] = useState("");
  const [open, setOpen] = React.useState(false);
  const [isBuying, setIsBuying] = React.useState(false);

  const crowdsaleTokenAmount = 1000000000;

  useEffect(() => {
    // Set up an interval to fetch data every 3 seconds
    const intervalId = setInterval(() => {
      getTokenBalance();
      getCrowdsaleInfo();
    }, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [address, walletProvider]);
  const [values, setValues] = React.useState({
    textmask: "(100) 000-0000",
    numberformat: "1320",
  });

  const getTokenBalance = useCallback(async () => {
    console.log(`fetch token balance ${address}`);
    const provider = await new JsonRpcProvider(getRPC());
    const ctcContract = new CTCContract(provider);
    const crowdSaleBalance = await ctcContract.balanceOf(getCrowdSaleAddress());
    setCrowdBalance(crowdSaleBalance);

    // get balanceOfWallet token
    if (walletProvider && address) {
      const provider = await new BrowserProvider(walletProvider);
      const ctcContract = new CTCContract(provider);
      const usdtContract = new USDTContract(provider);

      const balance = await ctcContract.balanceOf(address);
      const usdtBalanceOfWallet = await usdtContract.balanceOf(address);
      const ethers = await provider.getBalance(address);

      setUsdtBalanceOfWallet(usdtBalanceOfWallet);
      setEthBalanceOfWallet(usdtContract._toNumber(ethers));
      setTokenBalance(balance);
    } else {
      setTokenBalance(0);
      setUsdtBalanceOfWallet(0);
      setEthBalanceOfWallet(0);
    }
  }, [walletProvider, address]);

  const getCrowdsaleInfo = useCallback(async () => {
    try {
      console.log("fetch presale info");

      //get balance of crowsale contract
      const provider = await new JsonRpcProvider(RPC_TESTNET);

      const crowdsaleContract = new CrowdsaleContract(provider);

      const usdtRate = await crowdsaleContract.getUsdtRate();
      const ethRate = await crowdsaleContract.getEthRate();

      setEthRate(ethRate);
      setUsdtRate(usdtRate);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChangeAmountBuy = useCallback((values: NumberFormatValues) => {
    const { formattedValue, value, floatValue } = values;

    let amountReceive = 0;
    if (floatValue) {
      amountReceive =
        buyMethod == "ETH" ? floatValue * ethRate : floatValue * usdtRate;

      setAmountTokenReceive(() => amountReceive);
      setAmountBuy(() => floatValue);

      console.log({ amountReceive, floatValue });
    } else {
      setAmountBuy((prev) => prev);
    }
  }, []);

  const handleChangeAmountReceive = (values: NumberFormatValues) => {
    const { floatValue } = values;
    let amountToBuy = 0;
    if (floatValue) {
      amountToBuy =
        buyMethod == "ETH" ? floatValue * ethRate : floatValue * usdtRate;
      setAmountTokenReceive(() => floatValue);
      setAmountBuy(() => amountToBuy);
    } else {
      setAmountTokenReceive((prev) => prev);
    }
  };

  const checkBalanceOfWallet = () => {
    if (buyMethod === "USDT")
      return usdtBalanceOfWallet > 0 && usdtBalanceOfWallet >= amountBuy;
    if (buyMethod === "ETH")
      return ethBalanceOfWallet > 0 && ethBalanceOfWallet > amountBuy;
  };

  const handleBuyToken = async () => {
    try {
      if (walletProvider && address) {
        setIsBuying(true);
        const provider = await new BrowserProvider(walletProvider).getSigner();

        const crowdsaleContract = new CrowdsaleContract(provider);

        if (buyMethod === "USDT") {
          const usdtContract = new USDTContract(provider);
          const allowanceAmount = await usdtContract.allowance(
            address,
            crowdsaleContract._contractAddress
          );

          if (allowanceAmount < amountBuy)
            await usdtContract.approve(
              crowdsaleContract._contractAddress,
              amountBuy
            );
          const getHash = await crowdsaleContract.buyTokenByUSDT(amountBuy);

          if (getHash) {
            setHash(getHash);
            handleClickOpen();
          }
        } else if (buyMethod === "ETH") {
          if (ethBalanceOfWallet > amountBuy) {
            const getHash = await crowdsaleContract.buyTokenByETH(amountBuy);
            if (getHash) {
              setHash(getHash);
              handleClickOpen();
            }
          }
        }
        await getTokenBalance();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsBuying(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        borderRadius: 4,
        padding: "22px 36px",
        maxWidth: 407,
        backgroundImage: `url('/img/white-board.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <Typography
        textAlign="center"
        fontSize={20}
        fontWeight={800}
        color="black"
      >
        CTC launches on CTC day! Last chance to buy!
      </Typography>
      <PresaleTime isLoading={isLoading} />
      <CrowdsaleProgressBar
        isLoading={isLoading}
        crowdBalance={crowdBalance}
        crowdsaleTokenAmount={crowdsaleTokenAmount}
        usdtRate={usdtRate}
      />
      <Box marginTop={2} textAlign="center" sx={{ mx: "auto" }}>
        <Typography
          variant="subtitle2"
          fontSize={12}
          color="#9b8e8e"
          marginTop={1}
        >
          Your purchased CTC = {formatNumber(tokenBalance)}
        </Typography>
        <Typography
          variant="subtitle2"
          fontSize={12}
          color="#9b8e8e"
          marginTop={1}
        >
          Your stakeable CTC = 0
        </Typography>
        <Divider
          orientation="horizontal"
          variant="middle"
          flexItem
          sx={{ mt: 1 }}
        />
        <Typography marginTop={1} color="green">
          1 CTC = ${1 / usdtRate}
        </Typography>
        <Stack spacing={3} direction="row" marginTop={1}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setBuyMethod("ETH")}
            sx={{
              color: buyMethod == "ETH" ? "theme.primary" : "#c1aa90",
            }}
          >
            ETH
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setBuyMethod("USDT")}
            sx={{
              color: buyMethod == "USDT" ? "theme.primary" : "#c1aa90",
            }}
          >
            USDT
          </Button>
          <Button variant="outlined" size="large" disabled>
            CARD
          </Button>
        </Stack>
        <Box display="flex" gap={2} marginTop={1}>
          <Box>
            <Typography align="left" fontSize={12}>
              Buy With {buyMethod}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                border: "1px solid #eda55c",
                borderRadius: 1,
                px: 2,
                py: 1,
                height: 50,
              }}
            >
              <NumericFormat
                value={amountBuy}
                onValueChange={handleChangeAmountBuy}
                thousandSeparator=","
                style={{
                  outline: 0,
                  border: 0,
                  background: "transparent",
                  width: "100%",
                  fontSize: 13,
                }}
              />
              {buyMethod == "ETH" ? (
                <Image
                  src="/img/eth-logo.svg"
                  width={15}
                  height={15}
                  alt="eth-icon"
                />
              ) : (
                <Image
                  src="/img/usdt-logo.svg"
                  width={20}
                  height={25}
                  alt="eth-icon"
                />
              )}
            </Box>
          </Box>
          <Box>
            <Typography align="left" fontSize={12}>
              Max Receive CTC {amountTokenReceive}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                border: "1px solid #eda55c",
                borderRadius: 1,
                px: 2,
                py: 1,
                height: 50,
              }}
            >
              <NumericFormat
                value={amountTokenReceive}
                onValueChange={handleChangeAmountReceive}
                thousandSeparator=","
                style={{
                  outline: 0,
                  border: 0,
                  background: "transparent",
                  width: "100%",
                  fontSize: 13,
                }}
              />
              <Image
                src="/img/ctc-logo.svg"
                width={25}
                height={20}
                alt="ctc-icon"
              />
            </Box>
          </Box>
        </Box>
        {isLoading
          ? ""
          : !checkBalanceOfWallet() &&
            walletProvider && (
              <Typography
                variant="subtitle2"
                fontSize={10}
                color="#cc3770"
                marginTop={1}
                align="center"
              >
                You do not have enough {buyMethod} to pay for this transaction.
              </Typography>
            )}

        <Divider
          orientation="horizontal"
          variant="middle"
          flexItem
          sx={{ mt: 1 }}
        />
      </Box>
      <Button
        variant="contained"
        fullWidth
        disabled={!checkBalanceOfWallet()}
        onClick={handleBuyToken}
      >
        BUY NOW
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title" color="#388e3c">
          Buy CTC successfully!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography color="#395f95">
              <Link
                href={`https://sepolia.etherscan.io/tx/${hash}`}
                color="red"
                target="_blank"
              >
                View TX Details on Etherscan {showTransactionHash(hash)}
              </Link>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {isBuying && <Loader />}
    </Box>
  );
};

export default PresaleCard;
