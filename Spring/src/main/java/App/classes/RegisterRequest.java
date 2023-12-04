package App.classes;

public class RegisterRequest {
    private Integer id;
    private String name;
    private String lastname;
    private String phoneNumber;
    private String email;
    private String username;
    private String password;
    private String role;

    public RegisterRequest(Integer id, String name, String lastname, String phoneNumber, String email, String username, String password, String role) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public Integer getId() {
        return this.id;
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

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
