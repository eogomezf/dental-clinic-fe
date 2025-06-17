"use client";
import * as React from "react";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
} from "@mui/material";
import Sheet from "@mui/joy/Sheet";
import { Delete, EditCalendar } from "@mui/icons-material";

function DateNewFormat(dateString1: string | Date, dateString2: string | Date): string {
  const firstDate = new Date(dateString1);
  const secondDate = new Date(dateString2);

  return (
    firstDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) +
    " " +
    firstDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }) +
    " to " +
    secondDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

interface Appointment {
  id: string;
  title: string;
  description: string;
  startTime: string | Date;
  endTime: string | Date;
}

interface AppointmentsListProps {
  appointments: Appointment[];
  onAppointmentsUpdate?: (updated: Appointment[]) => void; // Optional callback for parent update
}

function AppointmentsList({ appointments, onAppointmentsUpdate }: AppointmentsListProps) {
  async function removeAppointment(appointmentId: string) {
    try {
      const response = await fetch(
        `http://localhost:3001/api/appointments/${appointmentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to delete appointment:", response.statusText);
        return;
      }

      const updatedAppointments: Appointment[] = await response.json();
      console.log("Updated Appointments:", updatedAppointments);

      if (onAppointmentsUpdate) {
        onAppointmentsUpdate(updatedAppointments);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  }

  return (
    <Container className="flex flex-col items-center justify-center py-4">
      <Box>
        <Sheet sx={{ height: 350, overflow: "auto" }}>
          <Table sx={{ minWidth: 1000 }} aria-label="Appointments Table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.title}</TableCell>
                  <TableCell>{appointment.description}</TableCell>
                  <TableCell>
                    {DateNewFormat(appointment.startTime, appointment.endTime)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Appointment">
                      <IconButton color="success">
                        <EditCalendar />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Appointment">
                      <IconButton
                        color="error"
                        onClick={() => removeAppointment(appointment.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Sheet>
      </Box>
    </Container>
  );
}

export default AppointmentsList;
