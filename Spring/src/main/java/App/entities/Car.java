package App.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.Instant;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Car {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    private String company;
    private String model;
    private double price;
    private String description;
    private String state;
    private String color;
    private Integer numOfDoors;
    private Float weight;
    private String fuelType;
    private Integer horsePower;
    private String image;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatetedAt;
    

    public Car() {
    }

    public Car(Integer id, User user, String company, String model, double price, String description, String state, String color, Integer numOfDoors, Float weight, String fuelType, Integer horsePower, String image, Instant createdAt, Instant updatetedAt) {
        this.id = id;
        this.user = user;
        this.company = company;
        this.model = model;
        this.price = price;
        this.description = description;
        this.state = state;
        this.color = color;
        this.numOfDoors = numOfDoors;
        this.weight = weight;
        this.fuelType = fuelType;
        this.horsePower = horsePower;
        this.image = image;
        this.createdAt = createdAt;
        this.updatetedAt = updatetedAt;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return this.user;
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

    public double getPrice() {
        return this.price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Instant getUpdatetedAt() {
        return this.updatetedAt;
    }

    public void setUpdatetedAt(Instant updatetedAt) {
        this.updatetedAt = updatetedAt;
    }

    public Car id(Integer id) {
        setId(id);
        return this;
    }

    public Car user(User user) {
        setUser(user);
        return this;
    }

    public Car company(String company) {
        setCompany(company);
        return this;
    }

    public Car model(String model) {
        setModel(model);
        return this;
    }

    public Car price(double price) {
        setPrice(price);
        return this;
    }

    public Car description(String description) {
        setDescription(description);
        return this;
    }

    public Car state(String state) {
        setState(state);
        return this;
    }

    public Car color(String color) {
        setColor(color);
        return this;
    }

    public Car numOfDoors(Integer numOfDoors) {
        setNumOfDoors(numOfDoors);
        return this;
    }

    public Car weight(Float weight) {
        setWeight(weight);
        return this;
    }

    public Car fuelType(String fuelType) {
        setFuelType(fuelType);
        return this;
    }

    public Car horsePower(Integer horsePower) {
        setHorsePower(horsePower);
        return this;
    }

    public Car image(String image) {
        setImage(image);
        return this;
    }

    public Car createdAt(Instant createdAt) {
        setCreatedAt(createdAt);
        return this;
    }

    public Car updatetedAt(Instant updatetedAt) {
        setUpdatetedAt(updatetedAt);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Car)) {
            return false;
        }
        Car car = (Car) o;
        return Objects.equals(id, car.id) && Objects.equals(user, car.user) && Objects.equals(company, car.company) && Objects.equals(model, car.model) && price == car.price && Objects.equals(description, car.description) && Objects.equals(state, car.state) && Objects.equals(color, car.color) && Objects.equals(numOfDoors, car.numOfDoors) && Objects.equals(weight, car.weight) && Objects.equals(fuelType, car.fuelType) && Objects.equals(horsePower, car.horsePower) && Objects.equals(image, car.image) && Objects.equals(createdAt, car.createdAt) && Objects.equals(updatetedAt, car.updatetedAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, company, model, price, description, state, color, numOfDoors, weight, fuelType, horsePower, image, createdAt, updatetedAt);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", user='" + getUser() + "'" +
            ", company='" + getCompany() + "'" +
            ", model='" + getModel() + "'" +
            ", price='" + getPrice() + "'" +
            ", description='" + getDescription() + "'" +
            ", state='" + getState() + "'" +
            ", color='" + getColor() + "'" +
            ", numOfDoors='" + getNumOfDoors() + "'" +
            ", weight='" + getWeight() + "'" +
            ", fuelType='" + getFuelType() + "'" +
            ", horsePower='" + getHorsePower() + "'" +
            ", image='" + getImage() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatetedAt='" + getUpdatetedAt() + "'" +
            "}";
    }

}
