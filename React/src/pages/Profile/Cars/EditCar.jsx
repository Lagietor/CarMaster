import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCar(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.localStorage.getItem("authToken") == null) {
            navigate("/");
        }
    })

    const { id } = useParams();

    return (
        <>
            <p className="text-light h3">EDIT CAR {id}</p>
        </>
    )
}

export default EditCar;