import { createContext, useEffect, useState } from "react";

export const CurrentUserContext = createContext()

const CurrentUserContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const getLoggedInUser = async () => {
            let response = await fetch("https://reddit-clone-backend-dfs.herokuapp.com/authentication/profile", {
                credentials: "include"
            })
            let user = await response.json()
            setCurrentUser(user)
        }
        getLoggedInUser()
    }, [])

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export default CurrentUserContextProvider