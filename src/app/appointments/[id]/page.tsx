import EditarFrm from "../../components/Forms/FormEditAppointment";
import { BE_URL } from "@/lib/config";

async function Editpage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await fetch(`${BE_URL}/${id}`);
  const appointment = await response.json();

  
  return (
    <div>
      <EditarFrm appointment={appointment} />
    </div>
  );
}

export default Editpage;
