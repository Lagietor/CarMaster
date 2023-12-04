import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    function handleChange(e) {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    function onSubmit(e) {
        e.preventDefault();

        authUser((isCorrect) => {
            if (isCorrect) {
                navigate("/")
                location.reload();
            }
        });
    }

    const authUser = async (callback) => {
        try {
            const response = await axios.post("http://localhost:8080/auth/authentication", credentials);

            setIsError(false);
            window.localStorage.setItem("authToken", response.data.token);

            callback(true)
        } catch (error) {
            setIsError(true);
            callback(false);
        }
    }

    return (
        <div className="container mt-3 bg-dark p-3">
            {isError ?
                <div className="alert alert-danger" role="alert">
                    There is something wrong with your email or your password
                </div>
            :
                    <></>
            }
            <p className="text-light text-center h3">Login</p>
            <div>
                <form className="form-control bg-dark border-dark" onSubmit={onSubmit}>
                    <p className="text-light h5">Email</p>
                    <input type="text" className="form-control bg-secondary border-secondary text-light" placeholder="Email" name="email" onChange={handleChange} />
                    <p className="text-light h5 mt-4">Password</p>
                    <input type="password" className="form-control bg-secondary border-secondary text-light" placeholder="Password" name="password" onChange={handleChange} />
                    <div className="text-center">
                        <input type="submit" className="btn btn-primary btn-lg mt-4" value="Submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;