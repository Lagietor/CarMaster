import { useEffect, useState } from "react";

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (window.localStorage.getItem("authToken")) {
            setIsAuth(true);
        }
    }, []);

    return isAuth;
}