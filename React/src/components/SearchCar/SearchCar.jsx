import { useState } from "react";
import { Collapse } from "react-collapse";
import "./SearchCar.css";
import { CaretDownFill } from "react-bootstrap-icons";
import { CaretUpFill } from "react-bootstrap-icons";

function SearchCar (props) {
    const [filtersVisibility, setFiltersVisibility] = useState(false);

    function changeFiltersVisibility() {
        setFiltersVisibility(!filtersVisibility);
    }

    return (
        <div className="container bg-dark rounded mt-3 w-75">
            <form className="form-inline">
                <div className="row px-3 pt-3">
                    <select className="form-select col mx-4 bg-secondary border-dark">
                        <option defaultValue="none">Car company</option>
                        <option value="BWM">BMW</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Mercedes">Mercedes</option>
                    </select>
                    <div className="row col">
                        <input type="text" className="form-control col ms-4 me-3 bg-secondary border-dark" placeholder="Car model" />
                        <a className="btn btn-primary col"><b>Search</b></a>
                    </div>
                </div>
                <div className="d-flex justify-content-center pt-1">
                    <a onClick={changeFiltersVisibility} className="slider">
                        {filtersVisibility ? (
                            <CaretUpFill color="#E19898" />
                        ) : (
                            <CaretDownFill color="#E19898" />
                        )}
                    </a>
                </div>
                <Collapse isOpened={filtersVisibility}>
                    <div className="row justify-content-between my-3">
                        <div className="col ms-4 mx-2">
                            <p className="text-light h6 text-center">Price</p> 
                            <div className="row justify-content-between">
                                <input type="text" className="col form-control bg-secondary border-dark me-2" placeholder="from" />
                                <input type="text" className="col form-control bg-secondary border-dark ms-2" placeholder="to" />
                            </div>
                        </div>
                        <div className="col mx-2 mb-3">
                            <p className="text-light h6 text-center">Fuel Type</p>
                            <select className="form-select bg-secondary border-dark">
                                <option defaultValue="regular_petrol">Regular petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="electric">Electric</option>
                                <option value="hydrogen">Hydrogen</option>
                            </select>
                        </div>
                        <div className="col mx-2 mb-3">
                            <p className="text-light h6 text-center">Filter</p>
                            <select className="form-select bg-secondary border-dark">
                                <option defaultValue="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="cheapiest">Chiepiest</option>
                                <option value="most_expensive">Most expensive</option>
                            </select>
                        </div>
                    </div>
                </Collapse>
            </form>
        </div>
    );
}

export default SearchCar;