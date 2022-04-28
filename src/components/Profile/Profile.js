import { PersonOutline } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import PostItem from "../PostItem/PostItem"

const Profile = () => {

    const [usersPosts, setUsersPosts] = useState([])
    const { username } = useParams()

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`http://localhost:4000/posts/${username}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            setUsersPosts(data)
        }
        fetchPosts()
    }, [username])

    let usersPostsDisplay = usersPosts.map((post, index) => {
        return (
            <PostItem postData={post} key={`profilePost${index}`} />
        )
    })

    return (
        <div className="myContainer">
            <div className="verticalFlexLeft">
                <h2 className="whiteText">Posts by u/{username}</h2>
                <div className="whiteText">{usersPostsDisplay}</div>
            </div>
            <div className="verticalFlexRight whiteText hideOnMediaQuery">
                <div className="verticalBoxCenteredNoHover">
                    <PersonOutline className="darkIconLarge" />
                    <h2>{username}</h2>
                    <Link to={`/profile/${username}`} className="myLink">
                        <p className="smGrayText">u/{username}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Profile