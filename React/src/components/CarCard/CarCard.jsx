import fuelElectricIcon from "../../assets/icons/fuelElectric.png";
import fuelIcon from "../../assets/icons/fuel.png";
import newCarIcon from "../../assets/icons/newCar.png";
import usedCarIcon from "../../assets/icons/usedCar.png";
import { useNavigate } from "react-router-dom";

function CarCard (props) {
    const navigate = useNavigate();

    return (
        <div key={props.id}>
            <div className=" bg-dark rounded mt-2 p-3">
                <div className="row justify-content-between">
                    <p className="col-4 text-light h5 ps-4">{props.car.company + " " + props.car.model}</p>
                    <p className="col-2 text-light h6 text-end">{props.car.state}<img src={(props.car.state == "New") ? newCarIcon : usedCarIcon} width="35" height="35" className="text-light ms-3"/></p>
                </div>
                <div className="row justify-content-between">
                    <div className="col-4 p-3 ms-3">
                        <img src={"cars/" + props.car.image} className="align-top rounded" width="300" height="200" alt="car Image"></img>
                    </div>
                    <div className="col pt-5">
                        <p className="bg-secondary rounded p-3">
                            {props.car.shortDescription}
                        </p>
                        <div className="justify-content-between me-3 pb-2">
                            <div className="row text-light mt-5">
                                <span className="col-4 text-center mb-0 mt-3">Fuel Type: {props.car.fuelType}<img src={(props.car.fuelType == "Electric") ? fuelElectricIcon : fuelIcon} className="ms-3" width="35" height="35"/></span>
                                <span className="col text-center mb-0 mt-3">Weight: {props.car.weight}kg</span>
                                <span className="col text-center mb-0 mt-3">Price: {props.car.price} $</span>
                                <div className="col-2">
                                    <a onClick={() => navigate(`/car/${props.car.id}`)} className="btn btn-primary btn-lg"><b>Check</b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CarCard;