import './App.css';
import './custom.scss';
import Header from './components/Header/Header'
import SearchCar from './components/SearchCar/SearchCar';
import CarsPanel from './components/CarsPanel/CarsPanel';

function App() {
	return (
		<>
			<Header />
			<SearchCar />
			<CarsPanel />
		</>
	)
}

export default App
