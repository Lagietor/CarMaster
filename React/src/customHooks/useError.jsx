export const useError = (value, message, regex = null) => {
    const [errors, setErrors] = useState();

    // TODO: do zrobienia
    if (!value.trim()) {
        setErrors((prevErrors) => [...prevErrors, message]);
    }

    if (regex.trim()) {
        if (!regex.test(value)) {
            setErrors((prevErrors) => [...prevErrors, message]);
        }
    }

    return { errors };
};
