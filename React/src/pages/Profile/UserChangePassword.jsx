import { useEffect, useState } from "react";
import { Check2, XLg } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../customHooks/useUser";
import axios from "axios";

function UserChangePassword() {
    const [formData, setFormData] = useState({
        password: "",
        password2: ""
    });

    const [passwordRequirements, setPasswordRequirements] = useState({
        hasLowerCaseLetter: false,
        hasUpperCaseLetter: false,
        hasNumber: false,
        has6Marks: false,
    });

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { isAuth, user } = useUser();

    useEffect(() => {
        if (window.localStorage.getItem("authToken") == null) {
            navigate("/");
        }
    })

    useEffect(() => {
        passwordValidationDisplay();
    }, [formData.password]);

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();

        try {
            validate((newErrors) => {
                if (newErrors.length === 0) {
                    changePassword(formData);
                    navigate("/profile");
                    location.reload();
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    function changePassword(formData) {
        try {
            console.log(user.id);
            axios.put(`http://localhost:8080/user/changePassword/${user.id}`, formData);
        } catch (error) {
            console.log("error: " + error);
        }
    }

    function validate(callback) {
        let newErrors = [];

        if (formData.password.length === 0) {
            if (!errors.includes("Field password is empty")) {
                setErrors((prevErrors) => [...prevErrors, "Field password is empty"]);
                newErrors.push("Field password is empty");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Field password is empty"));
        }

        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(formData.password)) {
            if (!errors.includes("Your password is too weak")) {
                setErrors((prevErrors) => [...prevErrors, "Your password is too weak"]);
                newErrors.push("Your password is too weak");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Your password is too weak"));
        }

        if (formData.password !== formData.password2) {
            if (!errors.includes("Both passwords are not the same")) {
                setErrors((prevErrors) => [...prevErrors, "Both passwords are not the same"]);
                newErrors.push("Both passwords are not the same");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Both passwords are not the same"));
        }

        callback(newErrors);
    }

    function passwordValidationDisplay() {
        setPasswordRequirements((prevState) => {
            if (/[a-z]/.test(formData.password)) {
                return { ...prevState, hasLowerCaseLetter: true };
            } else {
                return { ...prevState, hasLowerCaseLetter: false };
            }
        });

        setPasswordRequirements((prevState) => {
            if (/[A-Z]/.test(formData.password)) {
                return { ...prevState, hasUpperCaseLetter: true };
            } else {
                return { ...prevState, hasUpperCaseLetter: false };
            }
        });

        setPasswordRequirements((prevState) => {
            if (/\d/.test(formData.password)) {
                return { ...prevState, hasNumber: true };
            } else {
                return { ...prevState, hasNumber: false };
            }
        });

        setPasswordRequirements((prevState) => {
            if (/^.{6,}$/.test(formData.password)) {
                return { ...prevState, has6Marks: true };
            } else {
                return { ...prevState, has6Marks: false };
            }
        });
    }

    return (
        <div className="container mt-3 bg-dark p-3">
            {errors?.map((error, index) => (
                <div className="alert alert-danger" role="alert" key={index}>
                    {error}
                </div>
            ))}
            <p className="text-light text-center h3">Change password</p>
            <div>
                <form className="form-control bg-dark border-dark" onSubmit={handleSubmit}>
                    <p className="text-light h5 mt-4">Password</p>
                    <input type="password" className="form-control bg-secondary border-secondary text-light" name="password" onChange={handleChange} placeholder="Password" />
                    <div className="mt-3">
                        <p className={`text-${passwordRequirements.hasLowerCaseLetter ? "success" : "danger"}`}>
                            {passwordRequirements.hasLowerCaseLetter ? (
                                <Check2 className="me-4" />
                            ) : (
                                <XLg className="me-4" />
                            )}
                            A lowercase letter
                        </p>
                        <p className={`text-${passwordRequirements.hasUpperCaseLetter ? "success" : "danger"}`}>
                            {passwordRequirements.hasUpperCaseLetter ? (
                                <Check2 className="me-4" />
                            ) : (
                                <XLg className="me-4" />
                            )}
                            A capital(uppercase) letter
                        </p>
                        <p className={`text-${passwordRequirements.hasNumber ? "success" : "danger"}`}>
                            {passwordRequirements.hasNumber ? (
                                <Check2 className="me-4" />
                            ) : (
                                <XLg className="me-4" />
                            )}
                            A number
                        </p>
                        <p className={`text-${passwordRequirements.has6Marks ? "success" : "danger"}`}>
                            {passwordRequirements.has6Marks ? (
                                <Check2 className="me-4" />
                            ) : (
                                <XLg className="me-4" />
                            )}
                            Minimum 6 characters
                        </p>
                    </div>
                    <p className="text-light h5 mt-4">Repeat password</p>
                    <input type="password" className="form-control bg-secondary border-secondary text-light" name="password2" onChange={handleChange} placeholder="Password" />
                    <div className="text-center">
                        <input type="submit" className="btn btn-primary btn-lg mt-4" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserChangePassword;