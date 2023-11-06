function FilterPanel (props) {
    return (
        <div className="col-3 bg-dark rounded mt-2 p-3 ms-3">
            <div className="mb-4">
                <p className="text-light h5 text-center mb-3">State</p>
                <select className="form-select bg-secondary border-dark">
                    <option defaultValue="">State</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                </select>
            </div>
            <div className="mb-4">
                <p className="text-light h5 text-center mb-3">Price ($) from</p>
                <input type="text" className="form-control bg-secondary border-dark rounded" placeholder="1000"/>
            </div>
            <div className="mb-4">
                <p className="text-light h5 text-center mb-3">Price ($) to</p>
                <input type="text" className="form-control bg-secondary border-dark rounded" placeholder="100000"/>
            </div>
            <div className="mb-4">
                <p className="text-light h5 text-center mb-3">Horse power from</p>
                <input type="text" className="form-control bg-secondary border-dark rounded"/>
            </div>
            <div className="mb-4">
                <p className="text-light h5 text-center mb-3">Horse power to</p>
                <input type="text" className="form-control bg-secondary border-dark rounded"/>
            </div>
            <div className="mb-4">
                <p className="text-light h5 text-center mb-3">Fuel type</p>
                <select className="form-select bg-secondary border-dark">
                    <option defaultValue="regular_petrol">Regular petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hydrogen">Hydrogen</option>
                </select>
            </div>
        </div>
    );
}

export default FilterPanel;