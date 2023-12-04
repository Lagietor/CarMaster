import axios from "axios";
import { useEffect, useState } from "react";

export const useAxious = (url, method, postData = null) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            let response = null;

            try {
                setLoading(true);

                switch (method) {
                    case "post":
                        response = await axios.post(url, postData);
                        setResponse(response.data);
                        break;
                    case "get":
                        response = await axios.get(url);
                        setResponse(response.data);
                        break;
                    case "delete":
                        response = await axios.delete(url);
                        setResponse(response.data);
                        break;
                    case "put":
                        response = await axios.put(url, postData);
                        setResponse(response.data);
                        break;
                    default:
                        throw new Error("Unsupported method");
                }
            } catch (error) {
                setError("error: " + error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, method, postData]);

    return { response, error, loading };
};