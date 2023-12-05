import axios from "axios"
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const useUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getData = async (userId) => {
            try {

                const { data } = await axios.get(`http://localhost:8080/user/${userId}`);
                setUser(data);
            } catch (error) {
                console.log("error: " + error);
                setUser(null);
            }
        }
    
        if (window.localStorage.getItem("authToken")) {
            getData(jwtDecode(window.localStorage.getItem("authToken")).userId);
        }
    }, [])

    return { user };
}