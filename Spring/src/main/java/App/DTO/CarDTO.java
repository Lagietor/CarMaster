package App.DTO;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.time.Instant;

import App.entities.User;

public class CarDTO {
    private User user;
    private String company;
    private String model;
    private double price;
    private String description;
    private String shortDescription;
    private String state;
    private String color;
    private Integer numOfDoors;
    private Float weight;
    private String fuelType;
    private Integer horsePower;
    private String image;
    private Instant createdAt;
    private Instant updatetedAt;

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

    public String getModel() {
        return this.model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getPrice() {
        DecimalFormatSymbols symbols = new DecimalFormatSymbols();
        symbols.setGroupingSeparator(' ');

        DecimalFormat df = new DecimalFormat("#,###", symbols);
        return df.format(this.price);
    }

    public void setPrice(double price) {
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

    public Instant getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return this.updatetedAt;
    }

    public void setUpdatetedAt(Instant updatetedAt) {
        this.updatetedAt = updatetedAt;
    }
}
