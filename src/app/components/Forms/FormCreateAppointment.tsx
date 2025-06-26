"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import SendIcon from "@mui/icons-material/Send";
import { appointmentSchema } from "../../add-appointments/AppointmentSchema";
import { createAppointment } from "../../services/appointments.service";
import { AppointmentsListProps } from "@/app/models/appointments.model";

interface FormData {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  user: string;
  description: string;
  status: string;
}

const FormCreateAppointment = ({ usersList }: AppointmentsListProps) => {
  console.log("FormCreateAppointment rendered with usersList:", usersList);
  console.log(
    "FormCreateAppointment rendered with usersList[0]:",
    usersList[0]
  );

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const formik = useFormik<FormData>({
    initialValues: {
      id: "",
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      user: usersList.length > 0 ? usersList[0]._id : "",
      description: "",
      status: "pending",
    },
    validationSchema: appointmentSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          id: values.id,
          title: values.title,
          user: values.user,
          startTime: `${values.date}T${values.startTime}:00`,
          endTime: `${values.date}T${values.endTime}:00`,
          description: values.description,
          status: "pending",
        };

        const result = await createAppointment(payload);

        if (!result.ok) {
          throw new Error(result.message || "Error creating appointment");
        }

        setOpen(true);

        router.push("/appointments");
      } catch (err) {
        console.error("Submission error:", err);
        // alert((err as Error).message || "Failed to create appointment");
      }
    },
  });

  const appointmentTypes = [
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

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        mx: "auto",
        mt: 5,
        pb: 5,
        border: "solid 1px gray",
        borderRadius: 2,
        bgcolor: "#ffffee",
        color: "primary",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center", pt: 4 }}>
        Create a New Appointment
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" justifyContent="center" gap={2} m={5}>
          <Box sx={{ width: "50%" }}>
            <FormControl
              fullWidth
              required
              error={formik.touched.title && Boolean(formik.errors.title)}
            >
              <InputLabel id="appointment-title-label">
                Appointment Type
              </InputLabel>
              <Select
                labelId="appointment-title-label"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Appointment Type"
              >
                {appointmentTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.title && formik.errors.title && (
                <FormHelperText>{formik.errors.title}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box sx={{ width: "50%" }}>
            <TextField
              fullWidth
              required
              id="date"
              type="date"
              label="Select the date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>

        <Box m={5}>
          <FormControl fullWidth>
            <InputLabel id="user-label">Select User</InputLabel>
            <Select
              labelId="user-label"
              id="user"
              name="user"
              value={formik.values.user}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.user && Boolean(formik.errors.user)}
            >
              {usersList.map(
                (user: {
                  _id: string;
                  firstName: string;
                  lastName: string;
                }) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.firstName} {user.lastName}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" justifyContent="center" gap={2} m={5}>
          <Box sx={{ width: "50%" }}>
            <label htmlFor="startTime">Enter your Start Time:</label>
            <TextField
              type="time"
              fullWidth
              id="startTime"
              name="startTime"
              value={formik.values.startTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.startTime && Boolean(formik.errors.startTime)
              }
              helperText={formik.touched.startTime && formik.errors.startTime}
              inputProps={{ step: 300 }}
            />
          </Box>
          <Box sx={{ width: "50%" }}>
            <label htmlFor="endTime">Enter your End Time:</label>
            <TextField
              type="time"
              fullWidth
              id="endTime"
              name="endTime"
              value={formik.values.endTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.endTime && Boolean(formik.errors.endTime)}
              helperText={formik.touched.endTime && formik.errors.endTime}
              inputProps={{ step: 300 }}
            />
          </Box>
        </Box>

        <Box m={5}>
          <TextField
            fullWidth
            label="Enter your description!"
            id="description"
            multiline
            rows={4}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Box>

        <Box display="flex" justifyContent="space-between" m={5}>
          <Button
            sx={{ marginLeft: "50px" }}
            endIcon={<ReplyOutlinedIcon />}
            variant="contained"
            color="primary"
            onClick={() => router.push("/appointments")}
          >
            CANCEL
          </Button>
          <Button
            sx={{ marginRight: "50px" }}
            endIcon={<SendIcon />}
            variant="contained"
            color="primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Creating..." : "CREATE APPOINTMENT"}
          </Button>
          <Snackbar
            sx={{ width: "100%" }}
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert variant="filled" severity="success">
              {"Appointment created successfully!"}
            </Alert>
          </Snackbar>
        </Box>
      </form>
    </Box>
  );
};

export default FormCreateAppointment;
