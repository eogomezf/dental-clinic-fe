"use client";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import {
  Box,
  Tooltip,
  Stack,
  Typography,
  ButtonGroup,
  Button,
} from "@mui/material";
import Container from "@mui/material/Container";
import Sheet from "@mui/joy/Sheet";
import EditCalendar from "@mui/icons-material/EditCalendar";
import Delete from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { fetchAppointments, deleteAppointment } from "../services/appointments";
import { Appointment, AppointmentsListProps } from "../models/appointments";
import { formatDateRange, getAppointmentStatus } from "../utils/dateHelpers";

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

  const headers = ["Title", "Description", "Date", "Status", "Actions"];
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
                    <TableCell>
                      {(() => {
                        const { label, color, Icon } =
                          getAppointmentStatus(startTime);
                        return (
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Icon color={color} fontSize="small" />
                            <Typography color={color} fontSize="0.9rem">
                              {label}
                            </Typography>
                          </Stack>
                        );
                      })()}
                    </TableCell>
                    <TableCell align="right">
                      <Stack spacing={2}>
                        <ButtonGroup
                          variant="text"
                          aria-label="Appointment actions"
                        >
                          <Tooltip title="Edit Appointment">
                            <Button
                              onClick={() => console.log("Edit clicked")}
                              color="primary"
                            >
                              <EditCalendar />
                            </Button>
                          </Tooltip>

                          <Tooltip title="Delete Appointment">
                            <Button
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
                              color="error"
                            >
                              <Delete />
                            </Button>
                          </Tooltip>
                        </ButtonGroup>
                      </Stack>
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
