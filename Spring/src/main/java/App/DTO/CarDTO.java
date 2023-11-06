package App.DTO;

public class CarDTO {
    private Integer userId;
    private String company;
    private String generation;
    private Float price;
    private String state;
    private String color;
    private Integer numOfDoors;
    private Float weight;
    private String fuelType;
    private Integer horsePower;


    public CarDTO(Integer userId, String company, String generation, Float price, String state, String color, Integer numOfDoors, Float weight, String fuelType, Integer horsePower) {
        this.userId = userId;
        this.company = company;
        this.generation = generation;
        this.price = price;
        this.state = state;
        this.color = color;
        this.numOfDoors = numOfDoors;
        this.weight = weight;
        this.fuelType = fuelType;
        this.horsePower = horsePower;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getCompany() {
        return this.company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getGeneration() {
        return this.generation;
    }

    public void setGeneration(String generation) {
        this.generation = generation;
    }

    public Float getPrice() {
        return this.price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getState() {
        return this.state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getColor() {
        return this.color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getNumOfDoors() {
        return this.numOfDoors;
    }

    public void setNumOfDoors(Integer numOfDoors) {
        this.numOfDoors = numOfDoors;
    }

    public Float getWeight() {
        return this.weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public String getFuelType() {
        return this.fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public Integer getHorsePower() {
        return this.horsePower;
    }

    public void setHorsePower(Integer horsePower) {
        this.horsePower = horsePower;
    }
}
