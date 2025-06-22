export interface Appointment {
  id: string;
  title: string;
  description: string;
  startTime: string | Date;
  endTime: string | Date;
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export interface AppointmentsListProps {
  appointmentsList: Appointment[];
}

export type AppointmentStatus = {
  label: string;
  color: "error" | "warning" | "success";
  Icon: React.ElementType;
};
