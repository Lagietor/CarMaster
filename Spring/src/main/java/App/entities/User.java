package App.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import App.classes.Role;

import java.util.Collection;
import java.util.List;
import java.util.Objects;


@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String lastname;
    private String phoneNumber;
    private String email;
    private String username;
    private String password;
    private String profile;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Car> cars;


    public User() {
    }

    public User(Integer id, String name, String lastname, String phoneNumber, String email, String username, String password, String profile, Role role, List<Car> cars) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.username = username;
        this.password = password;
        this.profile = profile;
        this.role = role;
        this.cars = cars;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return this.lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfile() {
        return this.profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Car> getCars() {
        return this.cars;
    }

    public void setCars(List<Car> cars) {
        this.cars = cars;
    }

    public User id(Integer id) {
        setId(id);
        return this;
    }

    public User name(String name) {
        setName(name);
        return this;
    }

    public User lastname(String lastname) {
        setLastname(lastname);
        return this;
    }

    public User phoneNumber(String phoneNumber) {
        setPhoneNumber(phoneNumber);
        return this;
    }

    public User email(String email) {
        setEmail(email);
        return this;
    }

    public User username(String username) {
        setUsername(username);
        return this;
    }

    public User password(String password) {
        setPassword(password);
        return this;
    }

    public User profile(String profile) {
        setProfile(profile);
        return this;
    }

    public User role(Role role) {
        setRole(role);
        return this;
    }

    public User cars(List<Car> cars) {
        setCars(cars);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof User)) {
            return false;
        }
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(name, user.name) && Objects.equals(lastname, user.lastname) && Objects.equals(phoneNumber, user.phoneNumber) && Objects.equals(email, user.email) && Objects.equals(username, user.username) && Objects.equals(password, user.password) && Objects.equals(profile, user.profile) && Objects.equals(role, user.role) && Objects.equals(cars, user.cars);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, lastname, phoneNumber, email, username, password, profile, role, cars);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", lastname='" + getLastname() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", email='" + getEmail() + "'" +
            ", username='" + getUsername() + "'" +
            ", password='" + getPassword() + "'" +
            ", profile='" + getProfile() + "'" +
            ", role='" + getRole() + "'" +
            ", cars='" + getCars() + "'" +
            "}";
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
