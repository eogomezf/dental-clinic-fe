"use client";
import { useState, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import {
  Box,
  Tooltip,
  Stack,
  Typography,
  ButtonGroup,
  Button,
  TableFooter,
  TablePagination,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  useMediaQuery,
  useTheme,
  Alert,
} from "@mui/material";
import Container from "@mui/material/Container";
import Sheet from "@mui/joy/Sheet";
import Delete from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {
  fetchAppointments,
  deleteAppointment,
} from "../services/appointments.service";
import {
  Appointment,
  AppointmentsListProps,
} from "../models/appointments.model";
import { formatDateRange, getAppointmentStatus } from "../utils/dateHelpers";
import { EditCalendar } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function AppointmentsList({
  appointmentsList,
  usersList,
  userRole,
}: AppointmentsListProps & { userRole: string }) {
  const router = useRouter();

  const userMap = new Map(
    usersList.map((user) => [
      user._id,
      { firstName: user.firstName, lastName: user.lastName },
    ])
  );

  const fullAppointmentList = appointmentsList.map((appointment) => {
    const userData = userMap.get(appointment.user);

    return {
      ...appointment,
      firstName: userData?.firstName || "No data",
      lastName: userData?.lastName || "No data",
    };
  });

  const [appointments, setAppointments] = useState(fullAppointmentList);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - fullAppointmentList.length)
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  async function removeAppointment(appointmentId: string) {
    if (!appointmentId) return;

    try {
      await deleteAppointment(appointmentId);
      const updatedAppointmentsFetched = await fetchAppointments();
      const updatedAppointments = updatedAppointmentsFetched.appointments || [];
      const newFullAppointmentList = updatedAppointments.map(
        (appointment: Appointment) => {
          const userData = userMap.get(appointment.user);

          return {
            ...appointment,
            firstName: userData?.firstName || "No data",
            lastName: userData?.lastName || "No data",
          };
        }
      );

      setAppointments(newFullAppointmentList);

      setSnackbarMessage("The item has been deleted");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(`${error} - The item could not be deleted`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }

  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const handleOpenModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirm = (appointmentId: string) => {
    removeAppointment(appointmentId);
    setOpenModal(false);
  };

  let headers = [
    "PATIENT",
    "TITLE",
    "DESCRIPTION",
    "DATE & TIME",
    "STATUS",
    "ACTIONS",
  ];

  if (userRole !== "Doctor" && userRole !== "admin") {
    headers = ["TITLE", "DESCRIPTION", "DATE & TIME", "STATUS", "ACTIONS"];
  } else {
  }
  const handleAddAppointment = () => {
    router.push("/add-appointments");
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) =>
        appointment.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, appointments]);

  return (
    <Container className="flex flex-col items-center   justify-center py-4 ">
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Tooltip title="Add New Appointment">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddAppointment}
          >
            Add Appointment
          </Button>
        </Tooltip>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        ></Typography>

        <TextField
          id="outlined-search"
          label="Search appointment"
          type="search"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Box>
        <Sheet sx={{ height: 480, overflow: "auto" }}>
          <Table
            sx={{ minWidth: 1100, bgcolor: "primary" }}
            aria-label="table with sticky header"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <StyledTableCell
                    key={header}
                    align={index === headers.length - 1 ? "center" : "left"}
                  >
                    {header}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredAppointments.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredAppointments
              ).map(
                ({
                  id,
                  title,
                  description,
                  startTime,
                  endTime,
                  user,
                  status,
                  firstName,
                  lastName,
                }) => (
                  <TableRow
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {userRole === "admin" ? (
                      <TableCell component="th" scope="appointment">
                        {/* {user ? getUserName(user) : "No data"} */}
                        {firstName} {lastName}
                      </TableCell>
                    ) : null}
                    <TableCell>{title}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell>
                      {(() => {
                        const { datePart, time } = formatDateRange(
                          startTime,
                          endTime
                        );
                        return (
                          <>
                            <div>{datePart}</div>
                            <div>{time}</div>
                          </>
                        );
                      })()}
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const { label, color, Icon } = getAppointmentStatus(
                          startTime,
                          status
                        );
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
                    <TableCell>
                      <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                      >
                        <ButtonGroup
                          variant="text"
                          aria-label="Appointment actions"
                          disabled={status === "attended"}
                        >
                          <Tooltip title="Edit Appointment">
                            <Button
                              onClick={() => {
                                router.push("/appointments/" + id);
                              }}
                            >
                              <EditCalendar sx={{ color: "green" }} />
                            </Button>
                          </Tooltip>

                          <Tooltip title="Delete Appointment">
                            <Button
                              onClick={() =>
                                handleOpenModal({
                                  id,
                                  title,
                                  description,
                                  startTime,
                                  endTime,
                                  user,
                                  status,
                                })
                              }
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
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={appointments.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Sheet>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the {selectedAppointment?.title}{" "}
            appointment?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (selectedAppointment) {
                handleConfirm(selectedAppointment.id);
              }
            }}
            color="error"
            variant="contained"
          >
            Yes, delete it
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        message={snackbarMessage}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AppointmentsList;
