
export interface UserObj {
    id: number;
    username: string;
    password: string;
    role: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface UserArr extends Array<UserObj>{}

export interface InputValues {
    username: string;
    password: string;
}

export interface LoginReturn {
    success: boolean;
    loginErr: string;
    userErr: string; 
    passErr: string;
}
