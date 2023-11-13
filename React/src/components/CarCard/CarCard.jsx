import { useEffect, useState } from "react";
import axios from 'axios';
import carImg from "../../../public/cars/Cludatte.png";
import fuelElectricIcon from "../../../public/icons/fuelElectric.png";
import fuelIcon from "../../../public/icons/fuel.png";
import newCarIcon from "../../../public/icons/newCar.png";
import usedCarIcon from "../../../public/icons/usedCar.png";

function CarCard (props) {
    const [carsData, setCarsData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/car");
                setCarsData(response.data);
            } catch (error) {
                console.error("error: ", error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <div className="container w-75">
            {carsData ? 
                carsData.map((car, index) => (
                    <div className=" bg-dark rounded mt-2 p-3" key={index}>
                        <div className="row justify-content-between">
                            <p className="col-4 text-light h5 ps-4">{car.company + " " + car.generation}</p>
                            <p className="col-2 text-light h6 text-end">{car.state}<img src={(car.state == "New") ? newCarIcon : usedCarIcon} width="35" height="35" className="text-light ms-3"/></p>
                        </div>
                        <div className="row justify-content-between">
                            <div className="col-4 p-3 ms-3">
                                <img src={"cars/" + car.image} className="align-top rounded" width="300" height="200" alt="car Image"></img>
                            </div>
                            <div className="col pt-5">
                                <p className="bg-secondary rounded p-3">
                                    {car.shortDescription}
                                </p>
                                <div className="justify-content-between me-3 pb-2">
                                    <div className="row text-light mt-5">
                                        <span className="col-4 text-center mb-0 mt-3">Fuel Type: {car.fuelType}<img src={(car.fuelType == "Electric") ? fuelElectricIcon : fuelIcon} className="ms-3" width="35" height="35"/></span>
                                        <span className="col text-center mb-0 mt-3">Weight: {car.weight}kg</span>
                                        <span className="col text-center mb-0 mt-3">Price: {car.price} $</span>
                                        <div className="col-2">
                                            <a href="#" className="btn btn-primary btn-lg"><b>Check</b></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )):
                <div className="spinner-border text-primary justify-content-center" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
        </div>
    );
}

export default CarCard;