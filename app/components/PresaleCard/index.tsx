"use client";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, Suspense, useEffect, useState } from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { AccountCircle } from "@mui/icons-material";
import HDZContract from "@/app/contracts/HDZContract";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import {
  BrowserProvider,
  ethers,
  EtherscanProvider,
  getDefaultProvider,
  JsonRpcProvider,
} from "ethers";
import { getHDZAbi } from "@/app/contracts/utils/getAbis";
import { checkAmount, formatNumber } from "@/app/utils";
import PresaleTime from "./PresaleTime";
import { getCrowdSaleAddress } from "@/app/contracts/utils/getAddress";
import { PUBLIC_CHAIN_ID, RPC_TESTNET } from "@/app/contracts/utils/common";
import CrowdsaleContract from "@/app/contracts/CrowdsaleContract";
import CrowdsaleProgressBar from "./CrowdsaleProgressBar";
import Image from "next/image";
const PresaleCard = () => {
  const [buyMethod, setBuyMethod] = useState<String>("ETH");
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const [tokenBalance, setTokenBalance] = useState(0);
  const [crowdBalance, setCrowdBalance] = useState(0);
  const [usdtRate, setUsdtRate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [amountBuy, setAmountBuy] = useState(0);
  const [amountTokenReceive, setAmountTokenReceive] = useState(0);
  const crowdsaleTokenAmount = 1200000000;

  useEffect(() => {
    const getTokenBalance = async () => {
      // get balanceOfWallet token
      if (walletProvider && address) {
        const provider = await new BrowserProvider(walletProvider);
        const hdzContract = new HDZContract(provider);
        const balance = await hdzContract.balanceOf(address);
        setTokenBalance(balance);
      } else {
        setTokenBalance(0);
      }
    };
    getTokenBalance();
  });

  useEffect(() => {
    const getCrowdsaleInfo = async () => {
      try {
        //get balance of crowsale contract
        const provider = await new JsonRpcProvider(RPC_TESTNET);

        const hdzContract = new HDZContract(provider);
        const crowdsaleContract = new CrowdsaleContract(provider);

        const crowdSaleBalance = await hdzContract.balanceOf(
          getCrowdSaleAddress()
        );
        const usdtRate = await crowdsaleContract.getUsdtRate();

        setUsdtRate(usdtRate);
        setCrowdBalance(crowdSaleBalance);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getCrowdsaleInfo();
  }, []);

  const handleChangeAmountBuy = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let amountReceive = 0;
    if (checkAmount(value)) {
      if (!Number.isNaN(value)) {
        amountReceive =
          buyMethod == "ETH"
            ? Number(value) * 1000000
            : Number(value) * usdtRate;
        setAmountTokenReceive(() => amountReceive);
      }
      setAmountBuy(() => value);
    } else {
      setAmountBuy((prev) => prev);
    }
  };

  const handleChangeAmountReceive = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    let amountToBuy = 0;
    if (!Number.isNaN(value)) {
      amountToBuy = buyMethod == "ETH" ? value / 1000000 : value / usdtRate;
      setAmountTokenReceive(() => value);
      setAmountBuy(() => amountToBuy);
    } else {
      setAmountTokenReceive((prev) => prev);
    }
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
        CTC launches on doge day! Last chance to buy! {String(isLoading)}
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
            <TextField
              id="input-with-icon-textfield"
              value={amountBuy}
              onChange={handleChangeAmountBuy}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {buyMethod == "ETH" ? (
                      <Image
                        src="/img/eth-logo.svg"
                        width={25}
                        height={15}
                        alt="eth-icon"
                        style={{ marginLeft: 5 }}
                      />
                    ) : (
                      <Image
                        src="/img/usdt-logo.svg"
                        width={30}
                        height={15}
                        alt="eth-icon"
                      />
                    )}
                  </InputAdornment>
                ),
                sx: {
                  fontSize: 13,
                },
              }}
              variant="outlined"
            />
          </Box>
          <Box>
            <Typography align="left" fontSize={12}>
              Max Receive CTC
            </Typography>
            <TextField
              id="input-with-icon-textfield"
              value={amountTokenReceive}
              onChange={handleChangeAmountReceive}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Image
                      src="/img/ctc-logo.svg"
                      width={25}
                      height={20}
                      alt="ctc-icon"
                    />
                  </InputAdornment>
                ),
                sx: {
                  fontSize: 13,
                },
              }}
              variant="outlined"
            />
          </Box>
        </Box>
        <Typography
          variant="subtitle2"
          fontSize={10}
          color="#cc3770"
          marginTop={1}
          align="center"
        >
          You do not have enough {buyMethod} to pay for this transaction.
        </Typography>
        <Divider
          orientation="horizontal"
          variant="middle"
          flexItem
          sx={{ mt: 1 }}
        />
      </Box>
      <Button variant="contained" fullWidth>
        BUY NOW
      </Button>
    </Box>
  );
};

export default PresaleCard;
