import { Appointment } from "@/app/models/appointments.model";
import FormEditAppointment from "../../components/Forms/FormEditAppointment";
import { fetchAppointments } from "@/app/services/appointments.service";
import { fetchUsers } from "@/app/services/users.service";
import { User } from "@/app/models/users.model";

async function Editpage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const appointmentsFetched = await fetchAppointments();
  const appointments = appointmentsFetched.appointments || [];
  const appointment = appointments.find((a: Appointment) => a.id == id);

  const usersData = await fetchUsers();
  const users = usersData.allUsers || [];
  const user = users.find((user: User) => user._id === appointment.user);

  console.log("Editpage userInfo", user);

  return (
    <div>
      {appointment && (
        <FormEditAppointment appointment={appointment} user={user} />
      )}
    </div>
  );
}

export default Editpage;
