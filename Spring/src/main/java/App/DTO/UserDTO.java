package App.DTO;

public class UserDTO {
    private Integer id;
    private String email;
    private String name;
    private String lastname;
    private String nickname;
    private String password;
    private String profile;


    public UserDTO(Integer id, String email, String name, String lastname, String nickname, String password, String profile) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.lastname = lastname;
        this.nickname = nickname;
        this.password = password;
        this.profile = profile;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getNickname() {
        return this.nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
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

}
