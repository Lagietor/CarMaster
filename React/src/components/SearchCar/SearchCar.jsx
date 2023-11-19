import { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import "./SearchCar.css";
import { CaretDownFill } from "react-bootstrap-icons";
import { CaretUpFill } from "react-bootstrap-icons";
import axios from "axios";

function SearchCar (props) {
    const [filtersVisibility, setFiltersVisibility] = useState(false);
    const [carCompanies, setCarCompanies] = useState(null);

    const [carFilters, setCarFilters] = useState({
        company: null,
        model: null,
        priceFrom: null,
        priceTo: null,
        fuelType: null,
        sortFilter: "newest"
    });

    function changeFiltersVisibility() {
        setFiltersVisibility(!filtersVisibility);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get("http://localhost:8080/car/companies");
                setCarCompanies(data);
            } catch (error) {
                console.error("error: ", error);
            }
        }

        fetchData();
    }, []);

    function handleInputChange(e) {
        setCarFilters({...carFilters, [e.target.name]: e.target.value});
    }

    function handleFilterSubmit(e) {
        e.preventDefault();

        props.onFilterSubmit(carFilters);
    }

    return (
        <div className="container bg-dark rounded mt-3 w-75">
            <form className="form-inline" onSubmit={(e) => handleFilterSubmit(e)}>
                <div className="row px-3 pt-3">
                    <select className="form-select col mx-4 bg-secondary border-dark" name="company" onChange={(e) => handleInputChange(e)}>
                        <option value="">Car company</option>
                        {carCompanies ?
                            carCompanies.map((company, index) => (
                                <option value={company} key={index}>{company}</option>
                            )) :
                            <option>Loading...</option>
                        }
                    </select>
                    <div className="row col">
                        <input type="text" className="form-control col ms-4 me-3 bg-secondary border-dark" placeholder="Car model" name="model" onChange={(e) => handleInputChange(e)} />
                        <input type="submit" className="btn btn-primary col" value="Search" />
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
                                <input type="text" className="col form-control bg-secondary border-dark me-2" placeholder="from" name="priceFrom" onChange={(e) => handleInputChange(e)} />
                                <input type="text" className="col form-control bg-secondary border-dark ms-2" placeholder="to" name="priceTo" onChange={(e) => handleInputChange(e)} />
                            </div>
                        </div>
                        <div className="col mx-2 mb-3">
                            <p className="text-light h6 text-center">Fuel Type</p>
                            <select className="form-select bg-secondary border-dark" name="fuelType" onChange={(e) => handleInputChange(e)}>
                                <option value="">None</option>
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="electric">Electric</option>
                                <option value="hydrogen">Hydrogen</option>
                            </select>
                        </div>
                        <div className="col mx-2 mb-3">
                            <p className="text-light h6 text-center">Filter</p>
                            <select className="form-select bg-secondary border-dark" name="sortFilter" onChange={(e) => handleInputChange(e)}>
                                <option defaultValue="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="cheapest">Cheapest</option>
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