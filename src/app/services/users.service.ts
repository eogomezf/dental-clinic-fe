"use server";
import { cookies } from "next/headers";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function fetchUsers() {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwt_token")?.value;
  try {
    const response = await fetch(`${BASE_URL}/user`, {
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

export async function getUserInfo() {
  const cookie = cookies();
  const cookieValue = (await cookie).get("user")?.value;

  if (!cookieValue) {
    throw new Error("No token found");
  }

  const userInfo = JSON.parse(cookieValue);

  return userInfo || null;
}
