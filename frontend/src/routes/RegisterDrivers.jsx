import DriverForm from "../components/drivers/DriverForm";
import "./RegisterDrivers.css";

const RegisterDrivers = () => {
  return (
    <div className='driverContainer'>
      <h1>Cadastro de Motorista</h1>
      <p>Preencha o Formulário!</p>
      <DriverForm />
    </div>
  );
};

export default RegisterDrivers;