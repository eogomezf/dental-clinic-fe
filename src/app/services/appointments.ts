"use server";
import { cookies } from "next/headers";
import { Appointment } from "../models/appointments";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const cookieStore = await cookies();
const jwtToken = cookieStore.get("jwt_token")?.value;

export async function fetchAppointments() {
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

export async function EditAppointment(id: string, appointment: Appointment) {
  const response = await fetch(`${BASE_URL}/appointment/${id}`, {
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
export async function createAppointment(appointment: {
  title: string;
  description: string;
  startTime: string | Date;
  endTime: string | Date;
}) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "fail to create appointment");
  }
  return response.json();
}
