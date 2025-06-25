"use server";
import { cookies } from "next/headers";
import { Appointment } from "../models/appointments.model";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function fetchAppointments() {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwt_token")?.value;
  try {
    const response = await fetch(`${BASE_URL}/appointment`, {
      method: "GET",
      headers: {
        "x-access-token": jwtToken || "",
      },
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function EditAppointment(appointment: Appointment) {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwt_token")?.value;

  // const appointmentEdited = {
  //   ...appointment,
  //   user:
  //     typeof appointment.user === "object" && appointment.user !== null
  //       ? appointment.user._id
  //       : appointment.user,
  // };

  //onsole.log("Appointment Edited:", appointmentEdited);
  console.log("Appointment to save", appointment);

  const response = await fetch(`${BASE_URL}/appointment/${appointment.id}`, {
    method: "PUT",
    headers: {
      "x-access-token": jwtToken || "",
    },
    body: JSON.stringify(appointment),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Updating appointment failed");
  }
  return response.json();
}

export async function deleteAppointment(id: string) {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwt_token")?.value;
  const response = await fetch(`${BASE_URL}/appointment/${id}`, {
    method: "DELETE",
    headers: {
      "x-access-token": jwtToken || "",
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Deleting appointment failed");
  }
}
// export async function createAppointment(appointment: {
//   title: string;
//   description: string;
//   startTime: string | Date;
//   endTime: string | Date;
// }) {
//   const cookieStore = await cookies();
//   const jwtToken = cookieStore.get("jwt_token")?.value;
//   const response = await fetch(BASE_URL, {
//     method: "POST",
//     headers: {
//       "x-access-token": jwtToken || "",
//     },
//     body: JSON.stringify(appointment),
//   });
//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(errorText || "fail to create appointment");
//   }
//   return response.json();
// }

export interface AppointmentPayload {
  title: string;
  description: string;
  startTime: string | Date;
  endTime: string | Date;
  user: string;
}

export async function createAppointment(appointment: AppointmentPayload) {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwt_token")?.value;

  if (!jwtToken) {
    throw new Error("Token not found in cookies");
  }

  const response = await fetch(`${BASE_URL}/appointment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": jwtToken,
    },
    body: JSON.stringify(appointment),
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create appointment");
  }

  return response.json();
}
