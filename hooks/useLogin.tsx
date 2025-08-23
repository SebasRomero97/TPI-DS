import { useState } from 'react'
interface Props {
    userName: string,
    password: string
}

const useLogin = () => {

    

    const [userData, setUserData] = useState({
        userName: '',
        password: '',
        isLoged: false
    })
    
    const isLogged = () =>  userData.isLoged 

    const setLoggedStatus = ({password, userName}:Props) => {
        setUserData({
            userName: userName,
            password: password,
            isLoged: true
        })
        return userData.isLoged;
    }
  
  
  
    return {
        isLogged,
        setLoggedStatus

    }
}

export default useLogin