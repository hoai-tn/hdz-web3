import { Box, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const PresaleTime = ({ isLoading }: { isLoading: Boolean }) => {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate: Date = new Date("2024-08-31T23:59:59");

    const timer = setInterval(() => {
      const currentDate: Date = new Date();
      const timeDifference = targetDate.getTime() - currentDate.getTime();

      if (timeDifference <= 0) {
        clearInterval(timer);
        console.log("Countdown finished!");
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setRemainingTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array to run effect only once

  return (
    <Box marginTop={2}>
      {isLoading ? (
        <Skeleton
          variant="rounded"
          sx={{ fontSize: "3rem", borderRadius: 2 }}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "#d4e06a",
            px: 2,
            py: 1,
            borderRadius: 2,
          }}
        >
          <Box>
            <Typography>{remainingTime.days}</Typography>
            <Typography fontSize={12}>Days</Typography>
          </Box>
          <Box>
            <Typography>{remainingTime.hours}</Typography>
            <Typography fontSize={12}>Hours</Typography>
          </Box>
          <Box>
            <Typography>{remainingTime.minutes}</Typography>
            <Typography fontSize={12}>Minutes</Typography>
          </Box>
          <Box>
            <Typography>{remainingTime.seconds}</Typography>
            <Typography fontSize={12}>Seconds</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PresaleTime;
