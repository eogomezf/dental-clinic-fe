"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import SendIcon from "@mui/icons-material/Send";
// import { format } from "date-fns";

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

  /*
  const startTime = new Date(appointment.startTime);
  const formattedDate = startTime.toISOString().split("T")[0];

  const [title, setTitle] = useState(appointment.title);
  const [description, setDescription] = useState(appointment.description);
  const [fecha,setFecha] = useState(formattedDate);
  */

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  // Cargar datos iniciales
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

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const handleUpdate = async () => {
    const { title, description, date, startTime, endTime } = form;

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    const res = await fetch(
      `http://localhost:3001/api/appointments/${appointment._id}`,
      {
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
      }
    );

    if (res.ok) {
      alert("Cita actualizada correctamente");
      router.refresh();
      router.push("/appointments");
    } else {
      alert("Error al actualizar la cita");
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
              // value={format(new Date(appointment.endTime), "HH:mm")}
              fullWidth
              required
            />
          </Grid>
        </Box>
        <Box m={5}>
          <TextField
            fullWidth
            label="Enter your description!"
            id="description"
            multiline
            rows={4}
            value={form.description}
            onChange={handleChange("description")}
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
            sx={{ marginRight: "50px" }}
            endIcon={<SendIcon />}
            variant="contained"
            onClick={handleUpdate}
          >
            SUBMIT
          </Button>
        </Box>
      </>
    </Box>
  );
}

export default FormEditAppointment;
