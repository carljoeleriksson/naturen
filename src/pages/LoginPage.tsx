import React, { useState } from 'react'
import { InputValues, LoginReturn} from '../interfaces/interfaces'
import { useNavigate } from 'react-router-dom';
import { validateLogin } from '../utils/loginHelper'

function LoginPage() {
    let navigate = useNavigate();

    const [inputValues, setInputValues] = useState<InputValues>({username: '', password: ''})
    const [loginRes, setLoginRes] = useState<LoginReturn>({success: false, loginErr: '', userErr: '', passErr: ''})


    function handleFormInput(e: React.ChangeEvent<HTMLInputElement>) {
            let newdata: any = { ...inputValues };
            newdata[e.target.id] = e.target.value;

            setInputValues(newdata);
    }

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()
        const valObj: LoginReturn = await validateLogin(inputValues)
        setLoginRes(valObj)
        
        if(valObj.success){
            navigate('/');
        }
    }

    return (<>
        <form action="submit" className="login-form">
            <h5>Logga in</h5>
        <input 
                required
                type="text" 
                id="username"
                name="username"
                placeholder="Användarnamn" 
                value={inputValues?.username}
                onChange={(e) => handleFormInput(e)}
            />
            {loginRes.userErr !== '' && <span data-testid='userErr' className='login-fail-small'>* {loginRes.userErr}</span>}
            <input 
                required
                type="password" 
                id="password"
                name="password"
                placeholder="Lösenord" 
                value={inputValues?.password}
                onChange={(e) => handleFormInput(e)}
            />
            {loginRes.passErr !== '' && <span className='login-fail-small'>* {loginRes.passErr}</span>}
            <button onClick={handleSubmit} className="btn login-btn">Logga in</button>
            {loginRes.loginErr !== '' && <span className='login-fail'>Inloggning misslyckades</span>}
        </form>
            
    </>
    )
}

export default LoginPage