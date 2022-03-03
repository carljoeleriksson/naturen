import {InputValues, LoginReturn, UserArr} from '../interfaces/interfaces'


export async function getAllUsers() {
    const importedUsers: any = await import("../users.json")
    let users: UserArr = [...importedUsers.default]
    
    if(users) {
        return users
    } else {
        return []
    }
}

export async function validateLogin(values: InputValues) {

    const arrOfUsers: UserArr = await getAllUsers()
    let retObj: LoginReturn = {success: false, loginErr: '', userErr: '', passErr: ''}
    const allowedChars = /[a-z0-9_]{3,13}/
    
    if (!values.username) {      
       retObj.userErr = 'Fyll i användarnamn';

    } else if (!allowedChars.test(values.username)) {
       retObj.userErr = 'Ogiltigt användarnamn';
    }
 
    if (!values.password) {
       retObj.passErr = 'Fyll i lösenord';
    } 
    
    for(let i = 0; i < arrOfUsers.length; i++) {
        if(arrOfUsers[i].username === values.username && arrOfUsers[i].password === values.password){
            retObj.success = true
            saveToken(arrOfUsers[i].role)
            break
        } else {
            retObj.loginErr = 'Inloggning misslyckades'
        }
    }
    
    return retObj;
 }

 export function saveToken(role: string) {
     sessionStorage.setItem('auth', role)
 }