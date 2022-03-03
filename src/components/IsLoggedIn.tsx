import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function IsLoggedIn() {

    const navigate = useNavigate()

    const [loggedIn, setLoggedIn] = useState<boolean>(true);

    async function loginCheck() {

        let token = sessionStorage.getItem('auth');

        if (!token) {
            setLoggedIn(false);

        } else if(token === 'user' || token === 'admin'){
            setLoggedIn(true)
        }
    }



    useEffect(() => {
        loginCheck()
        if (!loggedIn){
           return navigate("/login");
        }
     },[loggedIn]);

    return (<></>)
}
