import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"

function Header (props) {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg bg-dark py-0">
            <div className="container-fluid">
                <a className="navbar-brand text-light" href="" onClick={() => navigate("/")}>
                    <img src={logo} width="190px" height="70px" className="d-inline-block align-top" alt="logo"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-lg-0 mx-2">
                    <li className="nav-item">
                        <a className="nav-link text-light mx-2" href="" onClick={() => navigate("/")}>Home</a>
                    </li>
                    <li>
                        <a className="nav-link text-light mx-2" href="" onClick={() => navigate("/login")}>Login</a>
                    </li>
                    <li>
                        <a className="nav-link text-light mx-2" href="" onClick={() => navigate("/register")}>Register</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;