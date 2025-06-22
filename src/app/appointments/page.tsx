import React from "react";
import AppointmentsList from "./AppointmentsList";
import NavBar from "./NavBar";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { fetchAppointments } from "../services/appointments.service";
<<<<<<< HEAD

export default async function page() {
  // const appointments = await fetchAppointments();

  const appointmentsFetched = await fetchAppointments();

  const appointments = appointmentsFetched.appointments || [];
=======
import { getUserInformation } from "../services/users.service";

export default async function page() {
  const appointmentsFetched = await fetchAppointments();
  const appointments = appointmentsFetched.appointments || [];
  const userData = await getUserInformation();

  let filteredAppointments = appointments;

  if (userData && userData.role === "Patient") {
    filteredAppointments = appointments.filter(
      (appointment: { user: { _id: string } }) =>
        appointment.user._id === userData.id
    );
  }
>>>>>>> 9e6e7de7e8168ad6ab346262b573abc4664cbe7d

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
<<<<<<< HEAD
        <AppointmentsList appointmentsList={appointments} />
=======
        <AppointmentsList appointmentsList={filteredAppointments} />
>>>>>>> 9e6e7de7e8168ad6ab346262b573abc4664cbe7d
      </Container>
    </>
  );
}
