import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function IsLoggedIn() {

    const navigate = useNavigate()

    const [loggedIn, setLoggedIn] = useState<boolean>(true);

    async function loginCheck() {

        let token = sessionStorage.getItem('auth');

        if (!token) {
            console.log('No token');
            setLoggedIn(false);

        } else if(token === 'user' || token === 'admin'){
            console.log('token (auth) is: ', token);
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
