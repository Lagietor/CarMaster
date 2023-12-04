import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TelephoneFill } from "react-bootstrap-icons";
import { PersonFill } from "react-bootstrap-icons";

function CarDetails() {
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        const getCarData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/car/${id}`);
                setCar(data);
            } catch (e) {
                console.log("error " + e)
            }
        }

        getCarData();
    }, []);

    return (
        <div>
            {car ?
                <div className="container bg-dark px-5 pt-5 pb-4 mt-4 rounded">
                    <div className="row">
                        <img src={`../cars/${car.image}`} className="col-6 rounded" width="500" height="400" alt="carImage"></img>
                        <div className="col">
                            <p className="h3 text-end text-light">{car.company + " " + car.model}</p>
                            <p className="h3 text-end text-primary">Price: {car.price}$</p>
                            <p className="h3 text-end text-light">State: {car.state}</p>
                            <p className="h5 text-end text-light mt-5"><PersonFill color="#E19898" className="me-2"/>{car.user.username}</p>
                            <p className="h5 text-end text-light"><TelephoneFill color="#E19898" className="me-2"/>+48 {car.user.phoneNumber}</p>
                        </div>
                    </div>
                    <div>
                        <p className="h3 text-light mt-5">Details:</p>
                        <div className="row">
                            <div className="col row">
                                <div className="col">
                                    <p className="h5 text-start text-light mt-4">Fuel type:</p>
                                    <p className="h5 text-start text-light">Horse power:</p>
                                </div>
                                <div className="col">
                                    <p className="h5 text-start text-light mt-4">{car.fuelType}</p>
                                    <p className="h5 text-start text-light">{car.horsePower}</p>
                                </div>
                            </div>
                            <div className="col row">
                                <div className="col">
                                    <p className="h5 text-start text-light mt-4">Number of doors:</p>
                                    <p className="h5 text-start text-light">Weight:</p>
                                </div>
                                <div className="col">
                                    <p className="h5 text-start text-light mt-4">{car.numOfDoors}</p>
                                    <p className="h5 text-start text-light">{car.weight}kg</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 mb-0">
                        <p className="h3 text-light">Description:</p>
                        <p className="bg-primary rounded text-dark p-3 mt-5 h5">
                            {car.description}
                        </p>
                    </div>
                </div>
            :
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            }
        </div>
    )
}

export default CarDetails;