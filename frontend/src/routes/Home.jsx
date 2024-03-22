import axios from "../axios/config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {

    const [drivers, setDrivers] = useState(null);

    //Load drivers
    useEffect(() => {

        const getDrivers = async () => {
            const res = await axios.get("/drivers");

            setDrivers(res.data);
        };

        getDrivers();
    }, []);

    const handleDeleteDriver = async (driverId) => {
        try {
            await axios.delete(`/drivers/${driverId}`);
            // Atualiza a lista de motoristas após a exclusão
            const updatedDrivers = drivers.filter(driver => driver._id !== driverId);
            setDrivers(updatedDrivers);
        } catch (error) {
            console.error("Erro ao excluir motorista:", error);
        }
    };

    if (!drivers) return <p>Carregando...</p>;

    return (
        <div className="homeContainer">
            <h1>Motoristas</h1>
            <div className="drivers-container">
                {drivers.length === 0 && <p>Não há motoristas cadastrados!</p>}
                {drivers.map((driver) => (
                    <div key={driver._id} className="driver">
                        <div className="driver-details">
                            <h3>Carro {driver.numberCar}</h3>
                            <h4>{driver.name}</h4>
                        </div>
                        <div className="driver-actions">
                            <Link to={`/drivers/${driver._id}`} className="btn-secondary">
                                Pagamento de Diárias
                            </Link>
                            <Link to={{ pathname: `/add-driver/${driver._id}`, state: { isEditing: true } }} className="btn-secondary">
                                Atualizar Motorista
                            </Link>
                        </div>
                        <div className="btn-exclude">
                            <button onClick={() => handleDeleteDriver(driver._id)}>X</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;