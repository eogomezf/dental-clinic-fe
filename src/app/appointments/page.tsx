import React from "react";
import AppointmentsList from "./AppointmentsList";
import NavBar from "./NavBar";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { fetchAppointments } from "../services/appointments.service";
import { fetchUsers } from "../services/users.service";
import { Appointment } from "../models/appointments.model";
import { getUserInformation } from "../services/users.service";

export default async function page() {
  const appointmentsFetched = await fetchAppointments();

  let appointments: Appointment[] = [];
  if (appointmentsFetched) {
    appointments = appointmentsFetched.appointments || [];

    appointments.sort((a: Appointment, b: Appointment) => {
      return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
    });
  }

  const loggedUser = await getUserInformation();
  console.log("Logged User:", loggedUser);
  const userRole = loggedUser?.role || "";
  console.log("User Role:", userRole);
  const usersData = await fetchUsers();
  const users = usersData.allUsers || [];

  return (
    <>
      <NavBar />

      <Container className="flex flex-col items-center justify-center mt-15 py-4">
        <Typography variant="h5" component="h2" gutterBottom>
          Dentora Pro Appointments
        </Typography>
        <AppointmentsList
          userRole={userRole}
          appointmentsList={appointments}
          usersList={users}
        />
      </Container>
    </>
  );
}
