import { useNavigate } from "react-router-dom";
import { useUser } from "../../customHooks/useUser";
import { useEffect } from "react";
import { useAuth } from "../../customHooks/useAuth";

function UserProfile(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.localStorage.getItem("authToken") == null) {
            navigate("/");
        }
    })

    const { isAuth, user } = useUser();

    return (
        <div className="container">
            {user ?
                <div className="bg-dark mt-3 p-4">
                    <div className="row justify-content-between">
                        <img src={`/users/${user.profile ? user.profile : "default.png"}`} className="col-3 ms-3" height="300" width="300"/>
                        <div className="col-6 row">
                            <div className="col">
                                <p className="text-light">Name:</p>
                                <p className="text-light">Lastname:</p>
                                <p className="text-light">Email:</p>
                                <p className="text-light">Username:</p>
                            </div>
                            <div className="col">
                                <p className="text-light me-4"><b>{user.name}</b></p>
                                <p className="text-light me-4"><b>{user.lastname}</b></p>
                                <p className="text-light me-4"><b>{user.email}</b></p>
                                <p className="text-light me-4"><b>{user.username}</b></p>
                            </div>
                            <div>
                                <button className="btn btn-primary px-5" onClick={() => navigate("/profile/edit")}>Edit</button>
                                <button className="btn btn-primary px-5 ms-4" onClick={() => navigate("/profile/changePassword")}>Change password</button>
                            </div>
                        </div>
                    </div>
                </div>
            :
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserProfile;