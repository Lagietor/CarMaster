import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import CarsPanel from "../components/CarsPanel/CarsPanel";
import SearchCar from "../components/SearchCar/SearchCar";

function Home() {
	const [filterData, setFilterData] = useState({});

	const handleFilterSubmit = (filterData) => {
		setFilterData(filterData);
	};

	// console.log(jwtDecode(window.localStorage.getItem("authToken")));
	// console.log(window.localStorage.getItem("authToken"));

    return (
        <>
        	<SearchCar onFilterSubmit={handleFilterSubmit}/>
			<CarsPanel filterData={filterData}/>
        </>
    )
}

export default Home;