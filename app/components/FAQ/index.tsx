import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container, Typography } from "@mui/material";

export default function FAQ() {
  return (
    <Container id="FAQ" maxWidth="md" sx={{ mt: 1 }}>
      <Typography variant="h4" align="center">
        FREQUENTLY ASKED QUESTIONS
      </Typography>
      <Accordion sx={{ bgcolor: "transparent", boxShadow: "none", mt: 5 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
         What is $CTC meme token?
        </AccordionSummary>
        <AccordionDetails>
        $CTC is a decentralized cryptocurrency token that originated as a meme within the cryptocurrency community. It typically features an image or symbol that represents a humorous or satirical concept. While some meme tokens have limited utility beyond entertainment or speculation, others may have underlying projects or communities supporting them.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Why you should buy $CTC
        </AccordionSummary>
        <AccordionDetails>
        Like many meme tokens, $CTC may offer the potential for significant price appreciation over time. If the token gains traction within the cryptocurrency community or attracts a dedicated following, its value could increase substantially.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
         Is investing in $CTC token risky?
        </AccordionSummary>
        <AccordionDetails>
        Like many meme tokens and cryptocurrencies, investing in $CTC carries inherent risks. The cryptocurrency market is known for its volatility, with prices often experiencing significant fluctuations in short periods. Additionally, meme tokens may lack fundamental value or utility beyond speculative trading, making them susceptible to rapid price changes and potential losses. Investors should conduct thorough research, exercise caution, and only invest what they can afford to lose when considering $CTC or any meme token.
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
