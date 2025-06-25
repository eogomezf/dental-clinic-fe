import FormCreateAppointment from "../components/Forms/FormCreateAppointment";
import { fetchUsers } from "../services/users.service";

async function Createpage() {
  const usersData = await fetchUsers();
  const users = usersData.allUsers || [];

  return (
    <div>
      <FormCreateAppointment usersList={users} appointmentsList={[]} />
    </div>
  );
}

export default Createpage;
