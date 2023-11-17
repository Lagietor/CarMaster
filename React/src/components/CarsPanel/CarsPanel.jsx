import { useState , useEffect} from "react";
import axios from "axios";
import BUBBAImg from "../../../public/cars/BUBBA.jpg";
import CarCard from "../CarCard/CarCard"
import CarPagination from "../CarPagination/CarPagination";

function CarsPanel (props) {
    const [carsData, setCarsData] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    function changeCurrentPage(newCurrentPage) {
        console.log(newCurrentPage);
        setCurrentPage(newCurrentPage - 1);
    }

    useEffect(() => {
        const fetchData = async (currentPage) => {
            try {
                const { data } = await axios.get("http://localhost:8080/car/page/" + currentPage);
                setCarsData(data);
            } catch (error) {
                console.error("error: ", error);
            }
        };
    
        fetchData(currentPage);
    }, [currentPage]);

    return (
        <div className="justify-content-center container w-75">
            {carsData ? 
                <div>
                    { carsData.content.map((car, index) => (
                        <CarCard car={car} key={index} id={index}/>
                    ))}
                    <CarPagination currentPage={carsData.currentPage} totalPages={carsData.totalPages} changeCurrentPage={changeCurrentPage} /> 
                </div>:
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"><img src={BUBBAImg} width="300" height="300"></img></span>
                    </div>
                </div>
            }
        </div>
    )
}

export default CarsPanel