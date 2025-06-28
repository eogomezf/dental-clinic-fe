"use server";
import { cookies } from "next/headers";
import { fetchAPI } from "@/utils/api";
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
    if (response.status === 204) {
      console.log("No appointments found");
      return [];
    }

    return response.json();
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

export async function createAppointment(appointment: Omit<Appointment, "id">) {
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
