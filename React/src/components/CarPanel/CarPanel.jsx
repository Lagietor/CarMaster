import FilterPanel from "../FilterPanel/FilterPanel"
import CarCard from "../CarCard/CarCard"

function CarPanel (props) {
    return (
        <div className="container w-75">
            <div className="justify-content-center row">
                <CarCard />
                <FilterPanel />
            </div>
        </div>
    )
}

export default CarPanel