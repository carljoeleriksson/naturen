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
    console.log('validateLogin values: ', values);

    const arrOfUsers: UserArr = await getAllUsers()
    let retObj: LoginReturn = {success: false, loginErr: '', userErr: '', passErr: ''}
    const allowedChars = /[a-z0-9_]{3,13}/
    
    if (!values.username) {      
        console.log('Användarnamn finns inte');
        
       retObj.userErr = 'Fyll i användarnamn';

    } else if (!allowedChars.test(values.username)) {
        console.log('Har fel format');
       retObj.userErr = 'Ogiltigt användarnamn';
    }
 
    if (!values.password) {
        console.log('Lösenord finns inte');
        
       retObj.passErr = 'Fyll i lösenord';
    } 
    
    for(let i = 0; i < arrOfUsers.length; i++) {
        console.log('Yo');
        
        if(arrOfUsers[i].username === values.username && arrOfUsers[i].password === values.password){
            retObj.success = true
            saveToken(arrOfUsers[i].role)
            break
        } else {
            retObj.loginErr = 'Inloggning misslyckades'
        }
    }
    console.log('retObj: ', retObj);
    
    return retObj;
 }

 export function saveToken(role: string) {
     console.log('role: ', role);
     sessionStorage.setItem('auth', role)
 }
 /* 

 async function validateogin(): Promise<boolean> {

    const arrOfUsers: UserArr = await getAllUsers()
    
    for(let i = 0; i > arrOfUsers.length; i++) {
        if(arrOfUsers[i].username === inputValues?.username 
        && arrOfUsers[i].password === inputValues?.password){
            return true
        }
    }

    return false
} */