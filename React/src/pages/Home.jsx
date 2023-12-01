import { useState } from "react";
import CarsPanel from "../components/CarsPanel/CarsPanel";
import SearchCar from "../components/SearchCar/SearchCar";

function Home() {
	const [filterData, setFilterData] = useState({});

	const handleFilterSubmit = (filterData) => {
		setFilterData(filterData);
	};

    return (
        <>
        	<SearchCar  onFilterSubmit={handleFilterSubmit}/>
			<CarsPanel filterData={filterData}/>
        </>
    )
}

export default Home;