import carImg from "../../assets/cludatte.png";
import fuelElectricIcon from "../../assets/fuelElectric.png";
import newCarIcon from "../../assets/newCar.png";

function CarCard (props) {
    return (
        <div className="container w-75">
            <div className=" bg-dark rounded mt-2 p-3">
                <div className="row justify-content-between">
                    <p className="col-2 text-light h5 ps-4">Car Name</p>
                    <p className="col-2 text-light h6 text-end">New<img src={newCarIcon} width="35" height="35" className="text-light ms-3"/></p>
                </div>
                <div className="row justify-content-between">
                    <div className="col-3 p-3 ms-3">
                        <img src={carImg} className="align-top rounded" width="200" height="200" alt="car Image"></img>
                    </div>
                    <div className="col pt-5">
                        <p className="bg-secondary rounded p-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                        </p>
                        <div className="justify-content-between me-3 pb-2">
                            <div className="row text-light mt-5">
                                <span className="col text-center mb-0 mt-3">Fuel Type: Electric<img src={fuelElectricIcon} className="ms-3" width="35" height="35"/></span>
                                <span className="col text-center mb-0 mt-3">Weight: 1600kg</span>
                                <span className="col text-center mb-0 mt-3">Price: 100000$</span>
                                <div className="col-2">
                                    <a href="#" className="btn btn-primary btn-lg"><b>Check</b></a>
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