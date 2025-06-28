"use server";
import { cookies } from "next/headers";
import { fetchAPI } from "@/utils/api";

export async function fetchUsers() {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwt_token")?.value;
  let response;
  try {
    response = await fetchAPI("/user", "GET", undefined, {
      "x-access-token": jwtToken || "",
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Login failed:", error);
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
