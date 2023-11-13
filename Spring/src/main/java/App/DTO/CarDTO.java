package App.DTO;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;

import App.entities.User;

public class CarDTO {
    private User user;
    private String company;
    private String generation;
    private Long price;
    private String description;
    private String shortDescription;
    private String state;
    private String color;
    private Integer numOfDoors;
    private Float weight;
    private String fuelType;
    private Integer horsePower;
    private String image;

    public Integer getUserId() {
        return this.user.getId();
    }

    public void setUser(User user) {
        this.user = user;
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

    public String getPrice() {
        DecimalFormatSymbols symbols = new DecimalFormatSymbols();
        symbols.setGroupingSeparator(' ');

        DecimalFormat df = new DecimalFormat("#,###", symbols);
        return df.format(this.price);
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
        setShortDescription();
    }

    public String getShortDescription() {
        return this.shortDescription;
    }

    public void setShortDescription() {
        if (description != null && description.length() > 100) {
            this.shortDescription = description.substring(0, 100) + "...";
        } else {
            this.shortDescription = description;
        }
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

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
