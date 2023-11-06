import './App.css';
import './custom.scss';
import Header from './components/Header/Header'
import SearchCar from './components/SearchCar/SearchCar';
import CarCard from './components/CarCard/CarCard';

function App() {

	return (
		<>
			<Header />
			<SearchCar />
			<CarCard />
		</>
	)
}

export default App
