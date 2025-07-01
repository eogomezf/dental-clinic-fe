"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import SendIcon from "@mui/icons-material/Send";
import { Button, Grid, Alert, Snackbar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import {
  EditAppointment,
  fetchAppointments,
} from "../../services/appointments.service";
import { Appointment } from "@/app/models/appointments.model";
import { AppointmentEditProps } from "@/app/models/appointments.model";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const APPOINTMENT_TYPES = [
  "Brace Consultation",
  "Braces Adjustment",
  "Cavity Filling",
  "Consultation for Braces",
  "Dental Cleaning",
  "Dental Crown Placement",
  "Emergency Visit",
  "Follow-up Visit",
  "Gum Treatment",
  "Implant Consultation",
  "Invisalign Evaluation",
  "Mouthguard Fitting",
  "Pediatric Cleaning",
  "Post-op Check",
  "Root Canal Evaluation",
  "Tooth Extraction",
  "Whitening Session",
];

function FormEditAppointment({ appointment, user }: AppointmentEditProps) {
  const router = useRouter();
  const [showSnackbar, setShowSnakbar] = useState(false);
  const [error, setError] = useState("");
  const [errorStartTime, setErrorStartTime] = useState("");
  const [errorEndTime, setErrorEndTime] = useState("");
  const [statusSubmit, setStatusSubmit] = useState(false);
  const [message, setMessage] = useState("");

  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  const showMessage = (alertMessage: string) => {
    setMessage(alertMessage);
    setShowSnakbar(true);
  };

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    status: "",
    observations: "",
  });

  useEffect(() => {
    const start = new Date(appointment.startTime);
    const end = new Date(appointment.endTime);

    setForm({
      title: appointment.title || "",
      description: appointment.description || "",
      date: start.toISOString().split("T")[0],
      startTime: start.toTimeString().slice(0, 5),
      endTime: end.toTimeString().slice(0, 5),
      status: appointment.status || "",
      observations: appointment.observations || "",
    });
  }, [appointment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate();
  };

  const validateDate = (value: string) => {
    const today = new Date().toISOString().split("T")[0];
    if (value < today) {
      setError("You cannot set a date before today");
      setStatusSubmit(true);
    } else {
      setError("");
      setStatusSubmit(false);
    }
  };

  const validateTime = async (field: string, value: string) => {
    const lunchStart = "12:00";
    const lunchEnd = "13:00";
    const minTime = "08:00";
    const maxTime = "17:00";
    const msg = "You cannot set this time for";

    if (field === "startTime") {
      if (
        value < minTime ||
        value > maxTime ||
        (value >= lunchStart && value <= lunchEnd)
      ) {
        setErrorStartTime(`${msg} ${field}`);
        setStatusSubmit(true);
      } else {
        if (form.endTime && value > form.endTime) {
          setErrorStartTime("The start time cannot be greater than end time");
          setStatusSubmit(true);
        } else {
          setErrorStartTime("");
          setStatusSubmit(false);
          const appointmentsFetched = await fetchAppointments();
          const appointments = appointmentsFetched.appointments || [];
          const appointmentFinded = appointments.find(
            (a: Appointment) =>
              new Date(a.startTime).toISOString().split("T")[0] == form.date &&
              new Date(a.startTime).toTimeString().slice(0, 5) == value
          );
          if (appointmentFinded) {
            showMessage(
              "An appointment already exists on the selected date and time"
            );
            setSeverity("warning");
            setStatusSubmit(true);
          } else {
            setStatusSubmit(false);
          }
        }
      }
    }

    if (field === "endTime") {
      if (
        value < minTime ||
        value > maxTime ||
        (value >= lunchStart && value <= lunchEnd)
      ) {
        setErrorEndTime(`${msg} ${field}`);
        setStatusSubmit(true);
      } else {
        if (form.startTime && value < form.startTime) {
          setErrorEndTime("The end time cannot be less than start time");
          setStatusSubmit(true);
        } else {
          setErrorEndTime("");
          setErrorStartTime("");
          setStatusSubmit(false);
        }
      }
    }
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (field === "date") {
        validateDate(value);
      }

      if (field === "startTime" || field === "endTime") {
        validateTime(field, value);
      }

      setForm({ ...form, [field]: value });
    };

  const handleSelectChange =
    (field: keyof typeof form) =>
    (event: React.SyntheticEvent, value: string | null) => {
      setForm((prevForm) => ({
        ...prevForm,
        [field]: value || "",
      }));
    };

  const handleSelectStatus =
    (field: keyof typeof form) =>
    (event: React.SyntheticEvent, value: string | null) => {
      setForm((prevForm) => ({
        ...prevForm,
        [field]: value || "",
      }));
    };

  const handleUpdate = async () => {
    const {
      title,
      description,
      date,
      startTime,
      endTime,
      status,
      observations,
    } = form;
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    appointment = {
      ...appointment,
      title,
      description,
      startTime: start,
      endTime: end,
      status: status,
      observations: observations,
    };

    const res = await EditAppointment(appointment);

    if (res.ok) {
      showMessage("The appointment has been updated successfully");
      setSeverity("success");
      router.push("/appointments");
    } else {
      showMessage("The appointmet was not updated " + res.error);
      setSeverity("error");
    }
  };

  const appointmentStatus = ["pending", "cancel", "attended"];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        mx: "auto",
        mt: 2,
        border: "solid 1px gray",
        borderRadius: 2,
        bgcolor: "#ffffee",
        color: "primary",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
          sx={{ textAlign: "center", pt: 3 }}
        >
          {user
            ? "Editing Appointment of " + user?.firstName + " " + user?.lastName
            : "Editing Appointment"}
        </Typography>
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent={"start"}
          gap={2}
          m={5}
        >
          <Grid
            display="flex"
            flexDirection={"row"}
            sx={{
              width: "100%",
              gap: 2,
            }}
          >
            <Autocomplete
              id="title"
              fullWidth
              options={APPOINTMENT_TYPES}
              value={form.title || null}
              onChange={handleSelectChange("title")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select your title"
                  required
                  error={form.title.trim() === ""}
                  helperText={
                    form.title.trim() === "" ? "The title is required" : ""
                  }
                />
              )}
            />

            <TextField
              fullWidth
              id="date"
              type="date"
              value={form.date}
              onChange={handleChange("date")}
              label="Select the date"
              error={!!error}
              helperText={error || " "}
            />
          </Grid>
        </Box>

        <Box display="flex" m={5}>
          <Grid
            display="flex"
            flexDirection={"row"}
            sx={{
              width: "100%",
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              type="time"
              id="starttime"
              label="Enter your Start Time:"
              value={form.startTime}
              onChange={handleChange("startTime")}
              error={!!errorStartTime}
              helperText={errorStartTime || " "}
            />
            <TextField
              fullWidth
              type="time"
              id="endtime"
              label="Enter your End Time:"
              value={form.endTime}
              onChange={handleChange("endTime")}
              error={!!errorEndTime}
              helperText={errorEndTime || " "}
            />
            <Autocomplete
              id="status"
              fullWidth
              options={appointmentStatus}
              value={form.status || null}
              onChange={handleSelectStatus("status")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select the status"
                  required
                  error={form.status.trim() === ""}
                  helperText={
                    form.status.trim() === "" ? "The status is required" : ""
                  }
                />
              )}
            />
          </Grid>
        </Box>
        <Box m={5}>
          <Accordion defaultExpanded sx={{ backgroundColor: "transparent" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="caption" component="span">
                Enter your description
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                fullWidth
                required
                id="description"
                multiline
                rows={3}
                value={form.description}
                onChange={handleChange("description")}
                error={form.description.trim() === ""}
                helperText={
                  form.description.trim() === ""
                    ? "Please enter a description"
                    : ""
                }
              />
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ backgroundColor: "transparent" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography variant="caption" component="span">
                Enter your observations
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                fullWidth
                label="Enter your observations"
                id="observations"
                multiline
                rows={3}
                value={form.observations}
                onChange={handleChange("observations")}
              />
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Button
            color="error"
            sx={{ marginLeft: "50px" }}
            endIcon={<ReplyOutlinedIcon />}
            variant="contained"
            onClick={() => {
              router.push("/appointments");
            }}
          >
            GO BACK
          </Button>
          <Button
            type="submit"
            sx={{ marginRight: "50px" }}
            endIcon={<SendIcon />}
            variant="contained"
            disabled={statusSubmit}
          >
            SUBMIT
          </Button>

          <Snackbar
            sx={{ width: "100%" }}
            open={showSnackbar}
            autoHideDuration={6000}
            onClose={() => setShowSnakbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert variant="filled" severity={severity}>
              {message}
            </Alert>
          </Snackbar>
        </Box>
      </form>
    </Box>
  );
}

export default FormEditAppointment;