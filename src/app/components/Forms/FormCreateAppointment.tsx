"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import SendIcon from "@mui/icons-material/Send";
import { appointmentSchema } from "../../add-appointments/AppointmentSchema";
import { createAppointment } from "../../services/appointments.service";
import Autocomplete from "@mui/material/Autocomplete";
import { User } from "@/app/models/users.model";

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

interface CreateAppointmentFormData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  user: string;
  description: string;
  status: string;
}
interface FormCreateAppointmentProps {
  usersList: User[];
}

const FormCreateAppointment: React.FC<FormCreateAppointmentProps> = ({
  usersList,
}) => {
  const router = useRouter();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const formik = useFormik<CreateAppointmentFormData>({
    initialValues: {
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
        const result = await createAppointment({
          ...values,
          startTime: `${values.date}T${values.startTime}:00`,
          endTime: `${values.date}T${values.endTime}:00`,
        });

        if (!result.ok) {
          throw new Error(result.message || "Error creating appointment");
        }

        setShowSnackbar(true);

        router.push("/appointments");
      } catch (err) {
        console.error("Submission error:", err);
      }
    },
  });

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
            <Autocomplete
              id="title"
              options={APPOINTMENT_TYPES}
              value={formik.values.title}
              onChange={(_, newValue) => {
                formik.setFieldValue("title", newValue);
              }}
              onBlur={() => formik.setFieldTouched("title", true)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Appointment Type"
                  required
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              )}
            />
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
          <Autocomplete
            id="user"
            options={usersList}
            getOptionLabel={(option) =>
              `${option.firstName} ${option.lastName}`
            }
            value={
              usersList.find((user) => user._id === formik.values.user) || null
            }
            onChange={(_, newValue) => {
              formik.setFieldValue("user", newValue?._id || "");
            }}
            onBlur={() => formik.setFieldTouched("user", true)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select User"
                required
                error={formik.touched.user && Boolean(formik.errors.user)}
                helperText={formik.touched.user && formik.errors.user}
              />
            )}
          />
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
            endIcon={<ReplyOutlinedIcon />}
            variant="contained"
            color="error"
            onClick={() => router.push("/appointments")}
          >
            CANCEL
          </Button>
          <Button
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
            open={showSnackbar}
            autoHideDuration={6000}
            onClose={() => setShowSnackbar(false)}
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
