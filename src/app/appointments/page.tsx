import React from "react";
import AppointmentsList from "./AppointmentsList";
// import { appointments } from "@/app/data/appointments-data";

import NavBar from "./NavBar";
import Container from "@mui/material/Container";

//import { getAppointments } from "@/app/data/appointments-data";

const API_BASE = "http://localhost:3001/api/appointments";

export const getItems = async () => {
  const res = await fetch(API_BASE);
  return res.json();
};

export default async function page() {
  const appointments = await getItems();
  return (
    <>
      <NavBar />

      <Container className="flex flex-col items-center justify-center mt-15 py-4">
        <h2 className="text-2xl font-bold mb-4">Dentora Pro Appointments</h2>
        <p className="text-gray-600 mb-8">
          Here are your upcoming appointments. Click on an appointment to view
          more details or to edit it.
        </p>
        <AppointmentsList appointments={appointments} />
      </Container>
    </>
  );
}
