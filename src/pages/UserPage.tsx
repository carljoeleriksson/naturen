import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../utils/loginHelper'
import {UserArr, UserObj} from '../interfaces/interfaces'
import Admin from '../components/Admin'
import { useNavigate } from 'react-router-dom'



function UserPage() {
    const navigate = useNavigate()

    const emptyUser: UserObj = {
        id: 0,
        username: '',
        password: '',
        role: '',
        firstName: '',
        lastName: '',
        email: ''
    }
    const [currentUser, setCurrentUser] = useState<UserObj>({
        id: 0,
        username: '',
        password: '',
        role: '',
        firstName: '',
        lastName: '',
        email: ''
    })

    async function findUser() {
        let userRole = sessionStorage.getItem('auth');
        console.log('userRole: ', userRole);
        
        const usersArr = await getAllUsers()
        const userObject:any = usersArr.find(user => 
            user.username === userRole
        )
        console.log('userObject: ', usersArr);
        
        setCurrentUser(userObject)
    }

    function renderUser() {
        return  (
            <div className='account-container'>
                <span className="account-label">Förnamn:</span>
                <span className="account-info" data-testid="firstname">{currentUser?.firstName}</span>
                <span className="account-label">Efternamn:</span>
                <span className="account-info" data-testid="lastname">{currentUser?.lastName}</span>
                <span className="account-label">Användarnamn:</span>
                <span className="account-info" data-testid="username">{currentUser?.username}</span>
                <span className="account-label">Mail:</span>
                <span className="account-info" data-testid="mail">{currentUser?.email}</span>
                <span className="account-label">Roll:</span>
                <span className="account-info" data-testid="role">{currentUser?.role}</span>
            </div>
            )
    }
    function renderAdmin(){
        return (
            <div className='admin-container' data-testid='admin-section'>
                <h2>Admin-section</h2>
                <Admin />
                
                {/* product-list som i cart men man tar bort från product list!*/}
                {/* lägg till produkt funkniton*/}
            </div>
        )
    }

    function handleLogoutClick() {
        sessionStorage.removeItem('auth')
        navigate('/login')
    }

    useEffect(() => {
        findUser()
    }, [])
    
  return (<div className='userpage-container'>
        <h2>Användaruppgifter</h2>
        {currentUser.id !== 0 && renderUser()}
        <button onClick={handleLogoutClick}>Logga ut</button>
        {currentUser.role === 'admin' && renderAdmin()}
  </div>
  )
}

export default UserPage