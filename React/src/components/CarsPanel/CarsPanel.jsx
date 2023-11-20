import { useState , useEffect} from "react";
import axios from "axios";
import CarCard from "../CarCard/CarCard"
import CarPagination from "../CarPagination/CarPagination";

function CarsPanel (props) {
    const [carsData, setCarsData] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentFilteredData, setCurrentFilteredData] = useState(null);

    function changeCurrentPage(newCurrentPage) {
        setCurrentPage(newCurrentPage - 1);
    }

    const fetchFilteredData = async (newFilteredData, currentPage) => {
        try {
            // console.log(newFilteredData);

            if (newFilteredData != currentFilteredData) {
                setCurrentPage(0);
                setCurrentFilteredData(newFilteredData);
            }

            const { data } = await axios.post(`http://localhost:8080/car/filter?page=${currentPage}`, newFilteredData);
            setCarsData(data);
        } catch (error) {
            console.error("error: ", error);
        }
    };

    useEffect(() => {
        fetchFilteredData(props.filterData, currentPage);
    }, [currentPage, props.filterData]);

    return (
        <div className="justify-content-center container w-75">
            {carsData ? 
                <div>
                    { carsData.content.map((car, index) => (
                        <CarCard car={car} key={index} id={index} />
                    ))}
                    <CarPagination currentPage={carsData.currentPage} totalPages={carsData.totalPages} changeCurrentPage={changeCurrentPage} /> 
                </div> :
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            }
        </div>
    )
}

export default CarsPanel