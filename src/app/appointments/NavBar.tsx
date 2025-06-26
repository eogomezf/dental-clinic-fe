"use client";
import * as React from "react";
<<<<<<< HEAD
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LogoutIcon from "@mui/icons-material/Logout";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/login/server-actions";
import { getUserInformation } from "../services/users.service";
import { useState } from "react";
import { Button } from "@mui/material";

type UserData = {
  fullName: string;
  role: string;
};

export default function ResponsiveAppBar() {
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    role: "",
  });

  React.useEffect(() => {
    getUserInformation().then((data) => {
      if (data) {
        setUserData({
          fullName: data.fullName ? data.fullName : "",
          role: data.role ? data.role : "",
        });
      }
    });
  }, []);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

=======
import {
    AppBar,
    Avatar,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
  } from "@mui/material";
  import { HealthAndSafety as HealthAndSafetyIcon, Menu as MenuIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/action/actions";

type Setting = {
  label: string;
  action?: () => void;
};

const settings: Setting[] = [
  { label: "Juan Perez - Admin" },
  { label: "Logout" }
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

>>>>>>> c232687c82f06e084bf2c56f89bf58be3210d49a
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAction();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
<<<<<<< HEAD
=======
      handleCloseUserMenu();
    }
  };

  const handleMenuItemClick = (setting: Setting) => {
    if (setting.label === "Logout") {
      handleLogout();
    } else {
      handleCloseUserMenu();
>>>>>>> c232687c82f06e084bf2c56f89bf58be3210d49a
    }
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HealthAndSafetyIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: "2rem",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
<<<<<<< HEAD
=======
              fontFamily: "monospace",
>>>>>>> c232687c82f06e084bf2c56f89bf58be3210d49a
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Dentora Pro
          </Typography>

<<<<<<< HEAD
=======
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              sx={{ display: "none" }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
            </Menu>
          </Box>

>>>>>>> c232687c82f06e084bf2c56f89bf58be3210d49a
          <HealthAndSafetyIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              fontSize: "2rem",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
<<<<<<< HEAD
=======
              fontFamily: "monospace",
>>>>>>> c232687c82f06e084bf2c56f89bf58be3210d49a
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Dentora Pro
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
<<<<<<< HEAD
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "right" }}
            >
              {userData.role} {userData.fullName}{" "}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button
              sx={{ flexGrow: 1, color: "white" }}
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogoutIcon />
            </Button>
=======
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Elvis Gomez" src="/static/images/avatar/2.jpg" />
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem 
                  key={setting.label} 
                  onClick={() => handleMenuItemClick(setting)}
                  disabled={setting.label === "Logout" && isLoggingOut}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {isLoggingOut && setting.label === "Logout" 
                      ? "Logging out..." 
                      : setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
>>>>>>> c232687c82f06e084bf2c56f89bf58be3210d49a
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
<<<<<<< HEAD
=======

export default ResponsiveAppBar;
>>>>>>> c232687c82f06e084bf2c56f89bf58be3210d49a
