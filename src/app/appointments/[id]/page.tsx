import Editar from "../../components/Forms/FormEditAppointment";

async function Editpage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await fetch(`http://localhost:3001/api/appointments/${id}`);
  const appointment = await response.json();

  if (!appointment) {
    // return <NotFound />;
    console.log("no encontrado");
  }

  return (
    <div>
      <Editar appointment={appointment} />
    </div>
  );
}

export default Editpage;
