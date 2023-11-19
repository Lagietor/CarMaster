package App.classes;

public class CarFilter {
    private String company;
    private String model;
    private Double priceFrom;
    private Double priceTo;
    private String fuelType;
    private String sortFilter;


    public CarFilter(String company, String model, Double priceFrom, Double priceTo, String fuelType, String sortFilter) {
        this.company = company;
        this.model = model;
        this.priceFrom = priceFrom;
        this.priceTo = priceTo;
        this.fuelType = fuelType;
        this.sortFilter = sortFilter;
    }

    public String getCompany() {
        return this.company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getModel() {
        return this.model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Double getPriceFrom() {
        return this.priceFrom;
    }

    public void setPriceFrom(Double priceFrom) {
        this.priceFrom = priceFrom;
    }

    public Double getPriceTo() {
        return this.priceTo;
    }

    public void setPriceTo(Double priceTo) {
        this.priceTo = priceTo;
    }

    public String getFuelType() {
        return this.fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getSortFilter() {
        return this.sortFilter;
    }

    public void setSortFilter(String sortFilter) {
        this.sortFilter = sortFilter;
    }
}
