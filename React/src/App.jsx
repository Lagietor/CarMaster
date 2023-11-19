import './App.css';
import './custom.scss';
import Header from './components/Header/Header'
import SearchCar from './components/SearchCar/SearchCar';
import CarsPanel from './components/CarsPanel/CarsPanel';
import { useState } from 'react';

function App() {
	const [filterData, setFilterData] = useState({});

	const handleFilterSubmit = (filterData) => {
		setFilterData(filterData);
	};

	return (
		<>
			<Header />
			<SearchCar  onFilterSubmit={handleFilterSubmit}/>
			<CarsPanel filterData={filterData}/>
		</>
	)
}

export default App
