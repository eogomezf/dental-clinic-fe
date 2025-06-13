"use client";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Box, Tooltip } from "@mui/material";
import Container from "@mui/material/Container";
import Sheet from "@mui/joy/Sheet";
import EditCalendar from "@mui/icons-material/EditCalendar";
import Delete from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { fetchAppointments, deleteAppointment } from "../services/appointments";
import { Appointment, AppointmentsListProps } from "../models/appointments";
import { formatDateRange } from "../utils/dateHelpers";

// function DateNewFormat(
//   dateString1: string | Date,
//   dateString2: string | Date
// ): string {
//   let firstDate: Date;
//   if (typeof dateString1 === "string") {
//     firstDate = new Date(Date.parse(dateString1));
//   } else {
//     firstDate = dateString1;
//   }

//   let secondDate: Date;

//   if (typeof dateString2 === "string") {
//     secondDate = new Date(Date.parse(dateString2));
//   } else {
//     secondDate = dateString2;
//   }

//   const result =
//     firstDate.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }) +
//     " " +
//     firstDate.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     }) +
//     " to " +
//     secondDate.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   return result;
// }

function AppointmentsList({ appointmentsList }: AppointmentsListProps) {
  const [appointments, setAppointments] =
    useState<Appointment[]>(appointmentsList);

  async function removeAppointment(appointmentId: string) {
    if (!appointmentId) {
      console.error("No appointment ID provided for deletion.");
      return;
    }
    try {
      await deleteAppointment(appointmentId);

      const updatedAppointments = await fetchAppointments();

      setAppointments(updatedAppointments);
      Swal.fire("Deleted!", "The item has been deleted.", "success");
    } catch (error) {
      Swal.fire("Error", "Error deleting appointment.", "error");
      console.error("Error deleting appointment", error);
    }
  }

  const headers = ["Title", "Description", "Date", "Actions"];
  return (
    <Container className="flex flex-col items-center   justify-center py-4 ">
      <Box>
        <Sheet sx={{ height: 350, overflow: "auto" }}>
          <Table
            sx={{ minWidth: 1000 }}
            aria-label="table with sticky header"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell
                    key={header}
                    align={index === headers.length - 1 ? "center" : "left"}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map(
                ({ _id, title, description, startTime, endTime }) => (
                  <TableRow
                    key={_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="appointment">
                      {title}
                    </TableCell>

                    <TableCell>{description}</TableCell>
                    <TableCell>{formatDateRange(startTime, endTime)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit Appointment">
                        <button className="text-blue-500 hover:underline">
                          <EditCalendar sx={{ color: "green" }} />
                        </button>
                      </Tooltip>
                      <Tooltip title="Delete Appointment">
                        <button
                          className="text-red-500 hover:underline ml-4"
                          onClick={(e) => {
                            e.preventDefault();
                            Swal.fire({
                              title: "Are you sure?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Yes, delete it!",
                              cancelButtonText: "No, cancel!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                removeAppointment(_id);
                              }
                            });
                          }}
                        >
                          <Delete />
                        </button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Sheet>
      </Box>
    </Container>
  );
}

export default AppointmentsList;
