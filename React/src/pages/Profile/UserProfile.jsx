import { useNavigate } from "react-router-dom";
import { useUser } from "../../customHooks/useUser";
import { useEffect, useState } from "react";
import { Eye, Pencil, Plus, Trash3 } from "react-bootstrap-icons";
import axios from "axios";

function UserProfile(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.localStorage.getItem("authToken") == null) {
            navigate("/");
        }
    }, []);

    const { user } = useUser();
    const [userState, setUserState] = useState(null);

    useEffect(() => {
        if (user) {
            setUserState(user);
        }
    }, [user]);

    const removeCar = async (carId) => {
        try {
            await axios.delete(`http://localhost:8080/car/delete/${carId}`);
            setUserState(prevUser => ({
                ...prevUser,
                cars: prevUser.cars.filter(car => car.id !== carId)
            }));
        } catch (error) {
            console.log("error: " + error);
        }
    }

    return (
        <div className="container">
            {user ?
                <div className="bg-dark mt-3 p-4">
                    <div className="row justify-content-between">
                        <img src={`/users/${user.profile ? user.profile : "default.png"}`} className="col-3 ms-3 rounded" height="300" width="300"/>
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
                    <div className="ms-3 mt-5">
                        <p className="text-light h3">Your cars</p>
                        <button className="btn btn-primary mt-5" onClick={() => navigate("addCar")}>Add new car<Plus /></button>
                        <div className="mt-3">
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Company</th>
                                        <th scope="col">Model</th>
                                        <th scope="col">Price</th>
                                        <th scope="col" className="col-lg-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userState && userState.cars.map((car, index) => (
                                        <tr key={index}>
                                            <th scope="col" className="align-middle">{index}</th>
                                            <td><img src={"cars/" + car.image} className="rounded" width="90" height="60" alt="car Image"></img></td>
                                            <td className="align-middle">{car.company}</td>
                                            <td className="align-middle">{car.model}</td>
                                            <td className="align-middle">{car.price}$</td>
                                            <td className="align-end">
                                                <div className="d-flex inline">
                                                    <button className="btn btn-sm btn-primary align-middle me-2" onClick={() => navigate(`/car/${car.id}`)}><Eye /></button>
                                                    <button className="btn btn-sm btn-primary align-middle me-2" onClick={() => navigate(`editCar/${car.id}`)}><Pencil /></button>
                                                    <button className="btn btn-sm btn-danger align-middle" onClick={() => removeCar(car.id)} ><Trash3 /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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