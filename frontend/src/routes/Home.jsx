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

    if (!drivers) return <p>Carregando...</p>;

    return (
        <div className="home">
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
                                Diárias
                            </Link>
                            <Link to={{ pathname: `/add-driver/${driver._id}`, state: { isEditing: true } }} className="btn-secondary">
                                Editar
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;