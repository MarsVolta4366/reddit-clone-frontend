import { createContext, useEffect, useState } from "react";

export const CurrentUserContext = createContext()

const CurrentUserContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const getLoggedInUser = async () => {
            let response = await fetch("http://localhost:4000/authentication/profile", {
                credentials: "include"
            })
            let user = await response.json()
            setCurrentUser(user)
        }
        getLoggedInUser()
    }, [])

    const deletePost = async (postData) => {
        const deletedPost = await fetch(`http://localhost:4000/posts/${postData.post_id}`, {
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