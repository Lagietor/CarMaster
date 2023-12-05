import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"
import { useUser } from "../../customHooks/useUser";

function Header (props) {
    const navigate = useNavigate();
    const { user } = useUser();

    function logout() {
        window.localStorage.removeItem("authToken");
        navigate("/");
    }

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
                        {user ?
                            <div>
                                <li>
                                    <a className="nav-link text-light mx-2" href="" onClick={logout}>Logout</a>
                                </li>
                            </div>
                        :
                            <>
                                <li>
                                    <a className="nav-link text-light mx-2" href="" onClick={() => navigate("/login")}>Login</a>
                                </li>
                                <li>
                                    <a className="nav-link text-light mx-2" href="" onClick={() => navigate("/register")}>Register</a>
                                </li>
                            </>
                        }
                    </ul>
                    {user ?
                        <>
                            <a className="text-decoration-none" onClick={() => navigate("/profile")} href="">
                                <p className="text-light me-4 mb-lg-0 h5"><b>{user.username}</b></p>
                            </a>
                            <img src={`/users/${user.profile ? user.profile : "default.png"}`} height="50" width="50"/>
                        </>
                    :
                        <></>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Header;