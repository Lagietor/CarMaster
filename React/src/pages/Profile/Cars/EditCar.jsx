import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../customHooks/useUser";
import axios from "axios";

function EditCar(props) {
    const navigate = useNavigate();
    const { user } = useUser();
    const { id } = useParams();
    let car = {};

    useEffect(() => {
        if (window.localStorage.getItem("authToken") == null) {
            navigate("/");
        }
    })

    const [formData, setFormData] = useState({
        company: "",
        model: "",
        state: "",
        description: "",
        fuelType: "",
        horsePower: "",
        numOfDoors: "",
        weight: "",
        color: "",
        price: "",
        userId: ""
    });

    useEffect(() => {
        if (user) {
            car = user.cars.find(car => car.id == id);
            setFormData({
                company: car.company,
                model: car.model,
                state: car.state,
                description: car.description,
                fuelType: car.fuelType,
                horsePower: car.horsePower,
                numOfDoors: car.numOfDoors,
                weight: car.weight,
                color: car.color,
                price: car.price,
                userId: user.id
            });
        }
    }, [user])

    const [errors, setErrors] = useState([]);
    const [image, setImage] = useState(null);

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function handleImage(e) {
        setImage(e.target.files[0])
    }

    function handleSubmit(e) {
        e.preventDefault();

        try {
            validate((newErrors) => {
                if (newErrors.length === 0) {
                    editCar((car) => {
                        if (image) {
                            uploadImage(car);
                        }
                        navigate("/profile");
                        location.reload();
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    function validate(callback) {
        let newErrors = [];

        if (formData.company.length === 0) {
            if (!errors.includes("Field company is empty")) {
                setErrors((prevErrors) => [...prevErrors, "Field company is empty"]);
                newErrors.push("Field company is empty");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Field company is empty"));
        }

        if (formData.model.length === 0) {
            if (!errors.includes("Field model is empty")) {
                setErrors((prevErrors) => [...prevErrors, "Field model is empty"]);
                newErrors.push("Field model is empty");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Field model is empty"));
        }

        if (formData.state.length === 0) {
            if (!errors.includes("State of car is required")) {
                setErrors((prevErrors) => [...prevErrors, "State of car is required"]);
                newErrors.push("State of car is required");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "State of car is required"));
        }

        if (formData.description.length === 0) {
            if (!errors.includes("Field description is empty")) {
                setErrors((prevErrors) => [...prevErrors, "Field description is empty"]);
                newErrors.push("Field description is empty");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Field description is empty"));
        }

        if (formData.fuelType.length === 0) {
            if (!errors.includes("Fuel type is required")) {
                setErrors((prevErrors) => [...prevErrors, "Fuel type is required"]);
                newErrors.push("Fuel type is required");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Fuel type is required"));
        }

        if (formData.horsePower.length === 0) {
            if (!errors.includes("Field horse power is empty")) {
                setErrors((prevErrors) => [...prevErrors, "Field horse power is empty"]);
                newErrors.push("Field horse power is empty");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Field horse power is empty"));
        }

        if (formData.numOfDoors.length === 0) {
            if (!errors.includes("Field number of doors is required")) {
                setErrors((prevErrors) => [...prevErrors, "Field number of doors is required"]);
                newErrors.push("Field number of doors is required");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Field number of doors is required"));
        }

        if (formData.weight.length === 0) {
            if (!errors.includes("Field weight is empty")) {
                setErrors((prevErrors) => [...prevErrors, "Field weight is empty"]);
                newErrors.push("Field weight is empty");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Field weight is empty"));
        }

        if (formData.color.length === 0) {
            if (!errors.includes("Field color is empty")) {
                setErrors((prevErrors) => [...prevErrors, "Field color is empty"]);
                newErrors.push("Field color is empty");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Field color is empty"));
        }

        if (formData.price.length === 0) {
            if (!errors.includes("Field price is empty")) {
                setErrors((prevErrors) => [...prevErrors, "Field price is empty"]);
                newErrors.push("Field price is empty");
            }
        } else {
            setErrors((prevErrors) => prevErrors.filter((error) => error !== "Field price is empty"));
        }

        callback(newErrors);
    }

    const editCar = async (callback) => {
        try {
            const { data } = await axios.put(`http://localhost:8080/car/edit/${id}`, formData);
            callback(data);
        } catch (error) {
            console.log("error: " + error);
        }
    }

    const uploadImage = async (car) => {
        const formData = new FormData();
        formData.append("image", image);

        try {
            axios.put(`http://localhost:8080/car/uploadImage/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
        } catch (error) {
            console.log("error: " + error);
        }
    }

    return (
        <>
            {user ?
                <div className="container">
                    <div className="bg-dark mt-3 p-3">
                        {errors?.map((error, index) => (
                            <div className="alert alert-danger" role="alert" key={index}>
                                {error}
                            </div>
                        ))}
                        <p className="text-light h3 text-center">Edit Car</p>
                        <div className="mt-5">
                            <form onSubmit={handleSubmit}>
                                <p className="text-light h5">Company</p>
                                <input type="text" className="form-control bg-secondary border-secondary text-light" name="company" onChange={handleChange} value={formData.company} placeholder="BMW" />
                                <p className="text-light h5 mt-4">Model</p>
                                <input type="text" className="form-control bg-secondary border-secondary text-light" name="model" onChange={handleChange} value={formData.model} placeholder="i4 eDrive35" />
                                <p className="text-light h5 mt-4">State</p>
                                <div className="radio-button mt-3">
                                    <input type="radio" className="radio-button__input" name="state" id="state1" value="New" onChange={handleChange} checked={formData.state == "New"} />
                                    <label className="radio-button__label" htmlFor="state1">
                                        <span className="radio-button__custom"></span>
                                        New
                                    </label>
                                </div>
                                <div className="radio-button">
                                    <input type="radio" className="radio-button__input" name="state" id="state2" value="Used" onChange={handleChange} checked={formData.state == "Used"} />
                                    <label className="radio-button__label" htmlFor="state2">
                                        <span className="radio-button__custom"></span>
                                        Used
                                    </label>
                                </div>
                                <p className="text-light h5 mt-4">Description</p>
                                <textarea name="description" className="form-control bg-secondary border-dark text-light" rows="3" value={formData.description} onChange={handleChange} />
                                <p className="text-light h5 mt-4">Fuel type</p>
                                <div className="radio-button mt-3">
                                    <input type="radio" className="radio-button__input" name="fuelType" id="fuelType1" value="Petrol" onChange={handleChange} checked={formData.fuelType == "Petrol"} />
                                    <label className="radio-button__label" htmlFor="fuelType1">
                                        <span className="radio-button__custom"></span>
                                        Petrol
                                    </label>
                                </div>
                                <div className="radio-button">
                                    <input type="radio" className="radio-button__input" name="fuelType" id="fuelType2" value="Diesel" onChange={handleChange} checked={formData.fuelType == "Diesel"} />
                                    <label className="radio-button__label" htmlFor="fuelType2">
                                        <span className="radio-button__custom"></span>
                                        Diesel
                                    </label>
                                </div>
                                <div className="radio-button">
                                    <input type="radio" className="radio-button__input" name="fuelType" id="fuelType3" value="Electric" onChange={handleChange} checked={formData.fuelType == "Electric"} />
                                    <label className="radio-button__label" htmlFor="fuelType3">
                                        <span className="radio-button__custom"></span>
                                        Electric
                                    </label>
                                </div>
                                <div className="radio-button">
                                    <input type="radio" className="radio-button__input" name="fuelType" id="fuelType4" value="Hydrogen" onChange={handleChange} checked={formData.fuelType == "Hydrogen"} />
                                    <label className="radio-button__label" htmlFor="fuelType4">
                                        <span className="radio-button__custom"></span>
                                        Hydrogen
                                    </label>
                                </div>
                                <p className="text-light h5 mt-4">Horse power</p>
                                <input type="text" className="form-control bg-secondary border-secondary text-light" name="horsePower" onChange={handleChange} value={formData.horsePower} placeholder="286" />
                                <p className="text-light h5 mt-4">Number of doors</p>
                                <div className="radio-button mt-3">
                                    <input type="radio" className="radio-button__input" name="numOfDoors" id="numOfDoors1" value="5" onChange={handleChange} checked={formData.numOfDoors == "5"} />
                                    <label className="radio-button__label" htmlFor="numOfDoors1">
                                        <span className="radio-button__custom"></span>
                                        5
                                    </label>
                                </div>
                                <div className="radio-button">
                                    <input type="radio" className="radio-button__input" name="numOfDoors" id="numOfDoors2" value="2" onChange={handleChange} checked={formData.numOfDoors == "2"} />
                                    <label className="radio-button__label" htmlFor="numOfDoors2">
                                        <span className="radio-button__custom"></span>
                                        2
                                    </label>
                                </div>
                                <p className="text-light h5 mt-4">Weight (kg)</p>
                                <input type="text" className="form-control bg-secondary border-secondary text-light" name="weight" onChange={handleChange} value={formData.weight} placeholder="1600" />
                                <p className="text-light h5 mt-4">Color</p>
                                <input type="text" className="form-control bg-secondary border-secondary text-light" name="color" onChange={handleChange} value={formData.color} placeholder="red" />
                                <p className="text-light h5 mt-4">Price ($)</p>
                                <input type="text" className="form-control bg-secondary border-secondary text-light" name="price" onChange={handleChange} value={formData.price} placeholder="120000" />
                                <p className="text-light h5 mt-4">Image (optional)</p>
                                <input type="file" className="custom-file-input bg-secondary text-light rounded" name="image" onChange={handleImage} />
                                <div className="text-center">
                                    <input type="submit" className="btn btn-primary btn-lg mt-4" value="Submit" />
                                </div>
                            </form>
                        </div>
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
    )
}

export default EditCar;