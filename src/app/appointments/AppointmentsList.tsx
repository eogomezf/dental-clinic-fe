import { Appointment } from "@/app/data/appointments-data";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Box, Tooltip } from "@mui/material";
import Container from "@mui/material/Container";
import Sheet from "@mui/joy/Sheet";
import EditCalendar from "@mui/icons-material/EditCalendar";
import Delete from "@mui/icons-material/Delete"; // Uncomment if you have a delete icon
// import { appointments } from "@/app/data/appointments-data";

function AppointmentsList({ appointments }: { appointments: Appointment[] }) {
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
                <TableCell>Title </TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow
                  key={appointment.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="appointment">
                    {appointment.title}
                  </TableCell>

                  <TableCell>{appointment.description}</TableCell>
                  <TableCell>
                    {" "}
                    {appointment.startTime.toLocaleDateString()}{" "}
                    {appointment.startTime.toLocaleTimeString()} -{" "}
                    {appointment.endTime.toLocaleTimeString()}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Appointment">
                      <button className="text-blue-500 hover:underline">
                        <EditCalendar sx={{ color: "green" }} />
                      </button>
                    </Tooltip>
                    <Tooltip title="Delete Appointment">
                      <button className="text-red-500 hover:underline ml-4">
                        <Delete />
                      </button>
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

  //   return (
  //     <div>
  //       {appointments.map((appointment) => (
  //         <div key={appointment.title} className="appointment-item">
  //           <h3>{appointment.title}</h3>
  //           <p>{appointment.description}</p>
  //           <p>
  //             {appointment.startTime.toLocaleDateString()}{" "}
  //             {appointment.startTime.toLocaleTimeString()} -{" "}
  //             {appointment.endTime.toLocaleTimeString()}
  //           </p>
  //         </div>
  //       ))}
  //     </div>
  //   );
}

export default AppointmentsList;
