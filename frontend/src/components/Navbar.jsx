import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
            <nav id="navbar">
                <h2>Sistema Riber Táxi</h2>
                <ul>
                    <li>
                    <Link to="/" className="btn">Motoristas</Link>
                    </li>
                    <li>
                        <Link to="/add-driver" className="btn">
                            Cadastrar Motoristas
                        </Link>
                    </li>
                    <li>
                        <Link to="/dailyPayment" className="btn">
                            Calendário de Diárias
                        </Link>
                    </li>
                </ul>
            </nav>
    );
};

export default Navbar;