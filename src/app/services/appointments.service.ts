"use server";
import { cookies } from "next/headers";
import { fetchAPI } from "@/utils/api";
import { Appointment } from "../models/appointments.model";

export async function fetchAppointments() {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwt_token")?.value;
  try {
    const response = await fetchAPI("/appointment", "GET", undefined, {
      "x-access-token": jwtToken || "",
    });

    if (response.status === 204) {
      return [];
    }

    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function EditAppointment(appointment: Appointment) {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwt_token")?.value;

  try {
    const response = await fetchAPI(
      `/appointment/${appointment.id}`,
      "PUT",
      appointment,
      {
        "x-access-token": jwtToken || "",
      }
    );

    return response;
  } catch (error) {
    return error;
  }
}

export async function deleteAppointment(id: string) {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwt_token")?.value;

  try {
    const response = await fetchAPI(`/appointment/${id}`, "DELETE", undefined, {
      "x-access-token": jwtToken || "",
    });

    return response;
  } catch (error) {
    return error;
  }
}

export async function createAppointment(appointment: Appointment) {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwt_token")?.value;

  if (!jwtToken) {
    throw new Error("Token not found in cookies");
  }

  try {
    const response = await fetchAPI("/appointment", "POST", appointment, {
      "x-access-token": jwtToken || "",
    });

    return response;
  } catch (error) {
    return error;
  }
}
