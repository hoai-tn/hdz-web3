import { formatNumber } from '@/app/utils'
import { Box, LinearProgress, Skeleton, Typography } from '@mui/material'
import React from 'react'

interface ICrowdsaleProgressBar {
    isLoading : Boolean,
    crowdsaleTokenAmount: number,
    crowdBalance: number,
    usdtRate: number
}

const CrowdsaleProgressBar = ({isLoading, crowdsaleTokenAmount, crowdBalance, usdtRate}: ICrowdsaleProgressBar)  => {
  return (
    <Box marginTop={2}>
    {isLoading ? (
      <Skeleton
        variant="rounded"
        sx={{ fontSize: "1.3rem", borderRadius: 5 }}
      />
    ) : (
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2" fontSize={12} color="#9b8e8e">
            {formatNumber(crowdsaleTokenAmount - crowdBalance)} CTC
          </Typography>
          <Typography variant="subtitle2" fontSize={12} color="#9b8e8e">
            {formatNumber(crowdsaleTokenAmount)} CTC
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={
            ((crowdsaleTokenAmount - crowdBalance) / crowdsaleTokenAmount) *
            100
          }
          sx={{
            height: 28,
            borderRadius: 5,
            border: 2,
            borderColor: "#723813",
          }}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2" fontSize={12} color="#e78711">
            {formatNumber((crowdsaleTokenAmount - crowdBalance) / usdtRate)}{" "}
            USD
          </Typography>
          <Typography variant="subtitle2" fontSize={12} color="#e78711">
            {formatNumber(crowdsaleTokenAmount / usdtRate)} USD
          </Typography>
        </Box>
      </Box>
    )}
  </Box>

  )
}

export default CrowdsaleProgressBar