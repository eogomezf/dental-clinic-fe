import { Appointment } from "@/app/models/appointments.model";
import FormEditAppointment from "../../components/Forms/FormEditAppointment";
import { fetchAppointments } from "@/app/services/appointments.service";

async function Editpage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = await params;
  const appointmentsFetched = await fetchAppointments();
  console.log("Appointments fetched:", appointmentsFetched);
  const appointments = appointmentsFetched.appointments || [];
  const appointment = appointments.find((a: Appointment) => a.id == id);

  return (
    <div>
      <FormEditAppointment appointment={appointment} />
    </div>
  );
}

export default Editpage;
