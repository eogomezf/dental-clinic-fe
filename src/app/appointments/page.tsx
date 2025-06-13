import React from "react";
import AppointmentsList from "./AppointmentsList";
import NavBar from "./NavBar";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

export default async function page() {
  const response = await fetch("http://localhost:3001/api/appointments");
  const appointments = await response.json();

  return (
    <>
      <NavBar />

      <Container className="flex flex-col items-center justify-center mt-15 py-4">
        <Typography variant="h5" component="h2" gutterBottom>
          Dentora Pro Appointments
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here are your upcoming appointments. Click on an appointment to edit
          it or to delete it.
        </Typography>
        <AppointmentsList appointmentsList={appointments} />
      </Container>
    </>
  );
}
