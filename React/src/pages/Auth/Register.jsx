import axios from "axios";
import { useEffect, useState } from "react";
import { Check2 } from "react-bootstrap-icons";
import { XLg } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function Register(props) {
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        username: "",
        password: "",
        password2: "",
    });

    // do custom Hook
    // const validationRules = [
    //     { field: 'name', validation: (value) => value.length > 0, message: 'Field name is empty' },
    //     { field: 'lastname', validation: (value) => value.length > 0, message: 'Field lastname is empty' },
    //     { field: 'email', validation: (value) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value), message: 'Email is incorrect' },
    // ]

    const [passwordRequirements, setPasswordRequirements] = useState({
        hasLowerCaseLetter: false,
        hasUpperCaseLetter: false,
        hasNumber: false,
        has6Marks: false,
    });

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        passwordValidationDisplay();
    }, [formData.password]);

    const addUser = async(userData) => {
        try {
            const { data } = axios.post("http://localhost:8080/user", userData);
        } catch (error) {
            console.log("error: " + error);
        }
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        try {
            validate((newErrors) => {
                console.log(newErrors);
                if (newErrors.length === 0) {
                    addUser(formData);
                    navigate("/");
                    console.log("przechodzi");
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    function validate(callback) {
        // TODO: do zrobienia customHook (useError)
        let newErrors = [];

        if (formData.name.length === 0) {
            if (!errors.includes("Field name is empty")) {
                setErrors((prevErrors) => [...prevErrors, "Field name is empty"]);
                newErrors.push("Field name is empty");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Field name is empty"));
        }

        if (formData.lastname.length === 0) {
            if (!errors.includes("Field lastname is empty")) {
                setErrors((prevErrors) => [...prevErrors, "Field lastname is empty"]);
                newErrors.push("Field lastname is empty");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Field lastname is empty"));
        }

        if (formData.email.length === 0) {
            if (!errors.includes("Field email is empty")) {
                setErrors((prevErrors) => [...prevErrors, "Field email is empty"]);
                newErrors.push("Field email is empty");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Field email is empty"));
        }

        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formData.email)) {
            if (!errors.includes("Email is incorrect")) {
                setErrors((prevErrors) => [...prevErrors, "Email is incorrect"]);
                newErrors.push("Email is incorrect");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Email is incorrect"));
        }

        if (formData.phoneNumber.length === 0) {
            if (!errors.includes("Field phone number is empty")) {
                setErrors((prevErrors) => [...prevErrors, "Field phone number is empty"]);
                newErrors.push("Field phone number is empty");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Field phone number is empty"));
        }

        if (!/^\d{9}$/.test(formData.phoneNumber)) {
            if (!errors.includes("Phone number is incorrect")) {
                setErrors((prevErrors) => [...prevErrors, "Phone number is incorrect"]);
                newErrors.push("Phone number is incorrect");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Phone number is incorrect"));
        }

        if (formData.username.length === 0) {
            if (!errors.includes("Field username is empty")) {
                setErrors((prevErrors) => [...prevErrors, "Field username is empty"]);
                newErrors.push("Field username is empty");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Field username is empty"));
        }

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
            <p className="text-light text-center h3">Register</p>
            <div>
                <form className="form-control bg-dark border-dark" onSubmit={handleSubmit}>
                    <p className="text-light h5">Name</p>
                    <input type="text" className="form-control bg-secondary border-secondary text-light" name="name" onChange={handleChange} placeholder="Name" />
                    <p className="text-light h5 mt-4">Lastname</p>
                    <input type="text" className="form-control bg-secondary border-secondary text-light" name="lastname" onChange={handleChange} placeholder="Lastname" />
                    <p className="text-light h5 mt-4">Email</p>
                    <input type="text" className="form-control bg-secondary border-secondary text-light" name="email" onChange={handleChange} placeholder="test@example.com" />
                    <p className="text-light h5 mt-4">Phone number</p>
                    <input type="text" className="form-control bg-secondary border-secondary text-light" name="phoneNumber" onChange={handleChange} placeholder="123456789" />
                    <p className="text-light h5 mt-4">Username</p>
                    <input type="text" className="form-control bg-secondary border-secondary text-light" name="username" onChange={handleChange} placeholder="Username" />
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

export default Register;
