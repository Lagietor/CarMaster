import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../customHooks/useUser";
import axios from "axios";

function UserProfileEdit() {
    const { user } = useUser();
    const [ image, setImage ] = useState(null);
    
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        phoneNumber: "",
        username: "",
        profile: ""
    });

    useEffect(() => {
        if (window.localStorage.getItem("authToken") == null) {
            navigate("/");
        }
    })

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                lastname: user.lastname,
                phoneNumber: user.phoneNumber,
                username: user.username,
                profile: user.profile
            });
        }
    }, [user])

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function handleImage(e) {
        setFormData({...formData, profile: e.target.files[0].name});
        setImage(e.target.files[0])
    }

    function handleSubmit(e) {
        e.preventDefault();

        try {
            validate((newErrors) => {
                if (newErrors.length === 0) {
                    if (image) {
                        uploadImage();
                    }
                    updateUser(formData);
                    navigate("/profile");
                    location.reload();
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    function updateUser(formData) {
        try {
            axios.put(`http://localhost:8080/user/edit/${user.id}`, formData);
        } catch (error) {
            console.log("error: " + error);
        }
    }

    function uploadImage() {
        const imageData = new FormData();
        imageData.append('file', image);

        console.log(imageData);

        try {
            axios.put(`http://localhost:8080/user/uploadImage/${user.id}`, imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            console.log("error: " + error);
        }
    }

    function validate(callback) {
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

        callback(newErrors);
    }

    return (
        <>
            {user ?
                <div className="container mt-3 bg-dark p-3">
                    {errors?.map((error, index) => (
                        <div className="alert alert-danger" role="alert" key={index}>
                            {error}
                        </div>
                    ))}
                    <p className="text-light text-center h3">Edit profile</p>
                    <div>
                        <form className="form-control bg-dark border-dark" onSubmit={handleSubmit}>
                            <p className="text-light h5">Name</p>
                            <input type="text" className="form-control bg-secondary border-secondary text-light" name="name" onChange={handleChange} placeholder="Name" value={formData.name} />
                            <p className="text-light h5 mt-4">Lastname</p>
                            <input type="text" className="form-control bg-secondary border-secondary text-light" name="lastname" onChange={handleChange} placeholder="Lastname" value={formData.lastname} />
                            <p className="text-light h5 mt-4">Phone number</p>
                            <input type="text" className="form-control bg-secondary border-secondary text-light" name="phoneNumber" onChange={handleChange} placeholder="123456789" value={formData.phoneNumber} />
                            <p className="text-light h5 mt-4">Username</p>
                            <input type="text" className="form-control bg-secondary border-secondary text-light" name="username" onChange={handleChange} placeholder="Username" value={formData.username} />
                            <p className="text-light h5 mt-4">Profile</p>
                            <input type="file" className="custom-file-input bg-secondary text-light rounded" name="profile" onChange={handleImage} />
                            <div className="text-center">
                                <input type="submit" className="btn btn-primary btn-lg mt-4" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            :
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            }
        </>
    );
}

export default UserProfileEdit;