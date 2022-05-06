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

    const deletePost = async (postData) => {
        const deletedPost = await fetch(`https://reddit-clone-backend-dfs.herokuapp.com/posts/${postData.post_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        await deletedPost.json()
        window.location.href = `/`
    }

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, deletePost }}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export default CurrentUserContextProvider