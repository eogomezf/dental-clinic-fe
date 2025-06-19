"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import SendIcon from "@mui/icons-material/Send";
import { BE_URL } from "@/lib/config";
import { Snackbar, Alert, AlertColor, Button, Grid } from "@mui/material";

interface Appointment {
  _id: string;
  title: string;
  description: string;
  startTime: string | Date;
  endTime: string | Date;
}

interface AppointmentProp {
  appointment: Appointment;
}

function FormEditAppointment({ appointment }: AppointmentProp) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const mostrarAlerta = (mensaje: string, tipo: AlertColor) => {
    setMessage(mensaje);
    setSeverity(tipo);
    setOpen(true);
  };

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const start = new Date(appointment.startTime);
    const end = new Date(appointment.endTime);

    setForm({
      title: appointment.title || "",
      description: appointment.description || "",
      date: start.toISOString().split("T")[0], // YYYY-MM-DD
      startTime: start.toTimeString().slice(0, 5), // HH:mm
      endTime: end.toTimeString().slice(0, 5), // HH:mm
    });
  }, [appointment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate();
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const handleUpdate = async () => {
    const { title, description, date, startTime, endTime } = form;
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    const res = await fetch(`${BE_URL}/${appointment._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        startTime: start,
        endTime: end,
      }),
    });

    if (res.ok) {
      mostrarAlerta("Datos guardados correctamente", "success");
      setTimeout(() => {
        router.refresh();
        router.push("/appointments");
      }, 2500);
    } else {
      mostrarAlerta("Hubo un error al guardar", "error");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        mx: "auto",
        mt: 5,
        pb: 5,
        borderRadius: 2,
        bgcolor: "#fff",
        color: "#000",
      }}
    >
      <>
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", pt: 4 }}
          >
            Please select from the below options:
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} m={5}>
            <TextField
              fullWidth
              required
              id="title"
              label="Enter your title!"
              value={form.title}
              onChange={handleChange("title")}
              error={form.title.trim() === ""}
              helperText={
                form.title.trim() === "" ? "El título es obligatorio" : ""
              }
            />
            <Grid display="flex" flexDirection={"column"} sx={{ width: "50%" }}>
              <TextField
                fullWidth
                required
                id="date"
                type="date"
                value={form.date}
                onChange={handleChange("date")}
                label="Select the date"
              />
            </Grid>
          </Box>

          <Box display="flex" justifyContent="center" gap={2} m={5}>
            <Grid display="flex" flexDirection={"column"} sx={{ width: "50%" }}>
              <label> Enter your Start Time:</label>
              <TextField
                type="time"
                id="starttime"
                value={form.startTime}
                onChange={handleChange("startTime")}
                fullWidth
                required
              />
            </Grid>
            <Grid display="flex" flexDirection={"column"} sx={{ width: "50%" }}>
              <label>Enter your End Time:</label>
              <TextField
                type="time"
                id="endtime"
                value={form.endTime}
                onChange={handleChange("endTime")}
                fullWidth
                required
              />
            </Grid>
          </Box>
          <Box m={5}>
            <TextField
              fullWidth
              required
              label="Enter your description!"
              id="description"
              multiline
              rows={4}
              value={form.description}
              onChange={handleChange("description")}
              error={form.description.trim() === ""}
              helperText={
                form.description.trim() === ""
                  ? "La descripción es obligatoria"
                  : ""
              }
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button
              sx={{ marginLeft: "50px" }}
              endIcon={<ReplyOutlinedIcon />}
              variant="contained"
              onClick={() => {
                router.refresh();
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
            >
              SUBMIT
            </Button>

            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={() => setOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={() => setOpen(false)}
                severity={severity}
                variant="filled"
                sx={{ width: "100%" }}
              >
                {message}
              </Alert>
            </Snackbar>
          </Box>
        </form>
      </>
    </Box>
  );
}

export default FormEditAppointment;
