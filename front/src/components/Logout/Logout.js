import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postLogout } from "../functions";

function Logout({setLoggedIn}) {
    const navigate = useNavigate();
    const setLogout = async () => {
        setLoggedIn(false);
        localStorage.clear();
    }

    const tryLogout = async () => {
        await postLogout();
        await setLogout();
        navigate('/')
    }
    
    useEffect(() => {
        tryLogout();
    }, []);
}

export default Logout;