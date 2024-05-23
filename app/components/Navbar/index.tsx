"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import ConnectWalletBtn from "../ConnectWalletBtn/ConnectWalletBtn";
import {
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { showSortAddress } from "@/app/utils";

const pages = [
  { href: "#about", name: "About" },
  { href: "#tokenomics", name: "Tokenomics" },
  { href: "staking", name: "Staking" },
  { href: "nft", name: "NFT" },
  { href: "campaign", name: "CrowdFunding" },
  { href: "#FAQ", name: "FAQ" },
];

function Navbar() {
  const { isConnected, address } = useWeb3ModalAccount();
  const { disconnect } = useDisconnect();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "inherit", padding: "0 20px", boxShadow: "none" }}
    >
      <Container maxWidth="lg" className="header-wrap">
        <Toolbar
          disableGutters
          sx={{ flex: 1, justifyContent: "space-between" }}
        >
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
              <Box sx={{ width: 250 }} role="presentation">
                <List>
                  {pages.map((page, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>{index % 2 === 0 ? 1 : 2}</ListItemIcon>
                        <ListItemText primary={page.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>{index % 2 === 0 ? 1 : 2}</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link href="/">
              <AdbIcon sx={{ mr: 1 }} />
              LOGO
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Link
                key={index}
                href={`/${page.href}`}
                style={{ margin: "0 10px" }}
              >
                {page.name}
              </Link>
            ))}
          </Box>
          <React.Suspense fallback={<p>Loading feed...</p>}>
            <Box sx={{ flexGrow: 0 }}>
              {isConnected ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={disconnect}
                >
                  {showSortAddress(address)}
                </Button>
              ) : (
                <ConnectWalletBtn variant="outlined" color="secondary">
                  Buy Now
                </ConnectWalletBtn>
              )}
            </Box>
          </React.Suspense>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
