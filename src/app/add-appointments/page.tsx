import FormCreateAppointment from "../components/Forms/FormCreateAppointment";
import { User } from "../models/users.model";
import { fetchUsers } from "../services/users.service";

async function Createpage() {
  const usersData = await fetchUsers();
  const users = usersData.allUsers || [];
  const filtred = users.filter((user: User) => user.role !== "admin");

  return (
    <div>
      <FormCreateAppointment usersList={filtred} appointmentsList={[]} />
    </div>
  );
}

export default Createpage;
