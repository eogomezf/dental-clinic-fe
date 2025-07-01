import FormCreateAppointment from "../components/Forms/FormCreateAppointment";
import { User } from "../models/users.model";
import { fetchUsers } from "../services/users.service";

async function CreatePage() {
  const usersData = await fetchUsers();
  const users = usersData.allUsers || [];
  const filteredUSer = users.filter((user: User) => user.role !== "admin" ) || [];

  return (
      <FormCreateAppointment usersList={filteredUSer} />
  );
}

export default CreatePage;
