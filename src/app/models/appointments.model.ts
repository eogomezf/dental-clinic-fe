import { User } from "./users.model";

export interface Appointment {
  id: string;
  title: string;
  description: string;
  startTime: string | Date;
  endTime: string | Date;
  user: string;
}

export interface AppointmentsListProps {
  appointmentsList: Appointment[];
  usersList: User[];
}

export type AppointmentStatus = {
  label: string;
  color: "error" | "warning" | "success";
  Icon: React.ElementType;
};
