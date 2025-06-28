"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LogoutIcon from "@mui/icons-material/Logout";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import IconButton from '@mui/material/IconButton';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useRouter } from "next/navigation";
import { logoutAction } from "../action/actions";
import { getUserInfo } from "../services/users.service";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';


type UserData = {
  firstName: string;
  lastName: string;
  role: string;
};

export default function ResponsiveAppBar() {
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    role: "",
  });

  const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
    setIsLoading(true);
    getUserInfo().then((data) => {
      if (data) {
        setUserData({
          firstName: data.firstName ? data.firstName : "",
          lastName: data.lastName ? data.lastName : "",
          role: data.role ? data.role : "",
        });
      }
    });
    setIsLoading(false);
  }, []);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAction();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: "flex", justifyContent: "space-between"}}>
          <Box display={"flex"} flexDirection={"row"}>
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
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Dentora Pro
          </Typography>

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
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Dentora Pro
          </Typography>
          </Box>
            {isLoading 
              ? <CircularProgress color="inherit"/> : 
            (<Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2, justifyContent: "center", }}>
            <div className="text-white font-bold">{userData.role === "admin" ? <ManageAccountsIcon/> : <PermIdentityIcon />}</div>
            <Typography
              variant="h6"
              component="p"
            >
              {userData.firstName} {userData.lastName}
            </Typography>
            <IconButton 
                size="small"
                onClick={handleLogout}
                disabled={isLoggingOut} >
              <LogoutIcon/>
            </IconButton>
          </Box>)
            }
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
